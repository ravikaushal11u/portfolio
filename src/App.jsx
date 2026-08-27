import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CanvasBackground from './components/CanvasBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // GSAP ScrollTrigger entrance animations for each section
    const sections = ['#about', '#skills', '#projects', '#contact'];
    
    sections.forEach((sectionId) => {
      const element = document.querySelector(sectionId);
      if (element) {
        gsap.fromTo(
          element,
          {
            opacity: 0,
            y: 60,
            filter: 'blur(10px)'
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 85%',
              toggleActions: 'play none none none',
            }
          }
        );
      }
    });

    // Animate Hero content on mount
    gsap.fromTo(
      '#home .clip-hud-corner',
      {
        opacity: 0,
        scale: 0.95,
        filter: 'blur(10px)'
      },
      {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 1.5,
        ease: 'power4.out',
        delay: 0.2
      }
    );
  }, []);

  return (
    <div className="relative min-h-screen text-slate-300 font-sans selection:bg-cyber-blue selection:text-black bg-cyber-bg overflow-x-hidden">
      {/* 3D Interactive Canvas Background */}
      <CanvasBackground />

      {/* Navigation */}
      <Navbar />

      {/* Main Sections */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-10 border-t border-cyber-purple/10 text-center font-mono text-xs text-slate-500 bg-cyber-bg/70 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>&copy; {new Date().getFullYear()} RAVI KAUSHAL. ALL RIGHTS RESERVED.</p>
          <p className="text-[10px] text-cyber-blue/50 tracking-wider">
            SYSTEM_STATUS: <span className="text-cyber-green font-bold animate-pulse">OPTIMIZED</span> | ENGINE: REACT_VITE
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
