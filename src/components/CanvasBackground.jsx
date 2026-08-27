import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const CanvasBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
    camera.position.z = 400;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    containerRef.current.appendChild(renderer.domElement);

    // Calculate viewport bounds at Z=0 for mouse alignment
    const getVisibleBounds = () => {
      const fovRad = (camera.fov * Math.PI) / 360;
      const vHeight = 2 * Math.tan(fovRad) * camera.position.z;
      const vWidth = vHeight * (width / height);
      return { width: vWidth, height: vHeight };
    };

    let bounds = getVisibleBounds();

    // --- 1. Background Fluid Gradient Shader (Subtle dark background) ---
    const bgUniforms = {
      u_time: { value: 0 },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_resolution: { value: new THREE.Vector2(width, height) }
    };

    const bgVertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const bgFragmentShader = `
      uniform float u_time;
      uniform vec2 u_mouse;
      uniform vec2 u_resolution;
      varying vec2 vUv;

      float noise(vec2 p) {
        return sin(p.x * 1.5 + sin(p.y * 1.2)) * cos(p.y * 1.5 + cos(p.x * 1.2));
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec2 m = u_mouse;
        float t = u_time * 0.05;

        vec2 q = vec2(0.0);
        q.x = noise(uv * 2.2 + vec2(t, t * 1.1) + m * 0.1);
        q.y = noise(uv * 2.2 + vec2(t * 0.8, -t * 0.7) - m * 0.1);

        vec2 r = vec2(0.0);
        r.x = noise(uv * 2.8 + q * 1.0 + vec2(t * 0.3, t * 0.5));
        r.y = noise(uv * 2.8 + q * 0.8 - vec2(t * 0.6, -t * 0.2));

        float f = noise(uv * 1.5 + r * 1.2);

        vec3 bgCol = vec3(0.02, 0.02, 0.05);       // Deep black/navy base
        vec3 pinkCol = vec3(0.35, 0.15, 0.20);     // Very dark subtle magenta glow
        vec3 blueCol = vec3(0.12, 0.18, 0.32);     // Very dark subtle blue glow
        vec3 violetCol = vec3(0.22, 0.14, 0.28);   // Very dark subtle violet glow

        vec3 finalCol = bgCol;
        finalCol = mix(finalCol, pinkCol, clamp(f * f * 1.0, 0.0, 1.0));
        finalCol = mix(finalCol, blueCol, clamp(length(q) * 0.5, 0.0, 1.0));
        finalCol = mix(finalCol, violetCol, clamp(r.x * r.x * 0.7, 0.0, 1.0));

        float vignette = uv.x * uv.y * (1.0 - uv.x) * (1.0 - uv.y);
        vignette = clamp(pow(16.0 * vignette, 0.4), 0.0, 1.0);
        finalCol *= vignette;

        gl_FragColor = vec4(finalCol, 1.0);
      }
    `;

    const bgMaterial = new THREE.ShaderMaterial({
      vertexShader: bgVertexShader,
      fragmentShader: bgFragmentShader,
      uniforms: bgUniforms,
      depthWrite: false
    });

    const bgGeometry = new THREE.PlaneGeometry(2, 2);
    const bgMesh = new THREE.Mesh(bgGeometry, bgMaterial);
    scene.add(bgMesh);

    // --- 2. Interactive Spring-Mass Particle Constellation ---
    const count = 110;
    const particles = [];
    const positions = new Float32Array(count * 3);
    const particleGeometry = new THREE.BufferGeometry();

    const rangeX = bounds.width * 0.95;
    const rangeY = bounds.height * 0.95;
    const rangeZ = 120;

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * rangeX;
      const y = (Math.random() - 0.5) * rangeY;
      const z = (Math.random() - 0.5) * rangeZ;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      particles.push({
        x: x,
        y: y,
        z: z,
        baseX: x,
        baseY: y,
        baseZ: z,
        vx: 0,
        vy: 0,
        vz: 0,
        angle: Math.random() * Math.PI * 2,
        speed: 0.06 + Math.random() * 0.1
      });
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Particle Dots Material (Soft glowing blue dots)
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x91d5ff,
      size: 4.0,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });

    const particlePoints = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particlePoints);

    // Connecting Lines Material (Elegant translucent lines)
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xcca9ff,
      transparent: true,
      opacity: 0.09,
      blending: THREE.AdditiveBlending
    });

    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(count * count * 6);
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    
    const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineSegments);

    // Mouse coordinates tracking (Aligned in Z=0 coordinates)
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0, active: false };

    const handleMouseMove = (event) => {
      const uX = event.clientX / window.innerWidth;
      const uY = event.clientY / window.innerHeight;
      
      mouse.targetX = uX * bounds.width - (bounds.width / 2);
      mouse.targetY = -(uY * bounds.height) + (bounds.height / 2);
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      
      bgUniforms.u_resolution.value.set(width, height);
      bounds = getVisibleBounds();
    };
    window.addEventListener('resize', handleResize);

    const clock = new THREE.Clock();
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth mouse coordinate tracking
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;
      
      bgUniforms.u_mouse.value.set(event ? (event.clientX / width) : 0.5, event ? (1.0 - event.clientY / height) : 0.5);
      bgUniforms.u_time.value = clock.getElapsedTime();

      const posArr = particleGeometry.attributes.position.array;
      const linePosArr = lineGeometry.attributes.position.array;
      let lineIndex = 0;

      for (let i = 0; i < count; i++) {
        const p = particles[i];

        // 1. Natural subtle float drift
        p.angle += 0.003;
        const driftX = Math.sin(p.angle + i) * 0.2;
        const driftY = Math.cos(p.angle + i) * 0.2;

        // 2. Mouse Repulsion Disturbance
        let pushX = 0;
        let pushY = 0;

        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const threshold = 110;
          if (dist < threshold) {
            const force = (threshold - dist) / threshold;
            pushX = (dx / dist) * force * 15.0;
            pushY = (dy / dist) * force * 15.0;
          }
        }

        // 3. Elastic Spring force to return to grid coordinate
        const springX = (p.baseX - p.x) * 0.03;
        const springY = (p.baseY - p.y) * 0.03;

        // Update velocities
        p.vx += springX + pushX + driftX;
        p.vy += springY + pushY + driftY;

        // Damping
        p.vx *= 0.90;
        p.vy *= 0.90;

        // Move coordinate
        p.x += p.vx;
        p.y += p.vy;

        posArr[i * 3] = p.x;
        posArr[i * 3 + 1] = p.y;
        posArr[i * 3 + 2] = p.z;

        // 4. Calculate connections
        for (let j = i + 1; j < count; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dz = p.z - p2.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < 100) {
            linePosArr[lineIndex * 6] = p.x;
            linePosArr[lineIndex * 6 + 1] = p.y;
            linePosArr[lineIndex * 6 + 2] = p.z;

            linePosArr[lineIndex * 6 + 3] = p2.x;
            linePosArr[lineIndex * 6 + 4] = p2.y;
            linePosArr[lineIndex * 6 + 5] = p2.z;

            lineIndex++;
          }
        }
      }

      particleGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.setDrawRange(0, lineIndex * 2);

      // Rotate scene slowly
      scene.rotation.y = clock.getElapsedTime() * 0.01;
      scene.rotation.x = clock.getElapsedTime() * 0.003;

      renderer.render(scene, camera);
    };

    let event = null;
    const trackEvent = (e) => { event = e; };
    window.addEventListener('mousemove', trackEvent);

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', trackEvent);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        renderer.domElement.remove();
      }
      bgGeometry.dispose();
      bgMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 -z-20 pointer-events-none overflow-hidden bg-[#020206]"
    />
  );
};

export default CanvasBackground;
