import React from 'react';
import { ExternalLink, Compass, Map, ShoppingBag, Sparkles } from 'lucide-react';
import { portfolioData } from '../config/data';
import theway from '../assets/theway.png';

const Projects = () => {
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;

    const rotateX = -(y / (box.height / 2)) * 8;
    const rotateY = (x / (box.width / 2)) * 8;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    
    const glareX = (e.clientX - box.left) / box.width * 100;
    const glareY = (e.clientY - box.top) / box.height * 100;
    card.style.setProperty('--glare-x', `${glareX}%`);
    card.style.setProperty('--glare-y', `${glareY}%`);
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  };

  const projectHighlights = {
    theway: [
      "Dynamic A* & Dijkstra visualization on interactive grids",
      "Custom path weight controls and adjustable search speed",
      "Fluid DOM animations for node search expansions"
    ],
    foodio: [
      "Custom layout with card swipe transformations",
      "Global state management for responsive checkout systems",
      "Liquid-smooth transition sequences using React Native Reanimated"
    ],
    stayfinder: [
      "Mapbox custom markers with floating card tooltips",
      "Dynamic reservation system with calendar scheduler",
      "Glassmorphic analytics panel showing custom filter analytics"
    ]
  };

  return (
    <section id="projects" className="py-24 px-6 max-w-7xl mx-auto relative">
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-dreamy-pink/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-dreamy-blue/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Heading */}
      <div className="flex flex-col items-start mb-16 text-left">
        <h2 className="text-xs font-bold tracking-widest text-dreamy-blue uppercase mb-2">
          03. SELECT WORK & DEMOS
        </h2>
        <h3 className="text-3xl md:text-4xl font-black tracking-tight text-white m-0">
          FEATURED PROJECTS
        </h3>
        <div className="w-16 h-[3px] bg-gradient-to-r from-dreamy-pink to-dreamy-blue mt-4"></div>
      </div>

      {/* Projects List */}
      <div className="space-y-32">
        {portfolioData.projects.map((project, index) => {
          const isEven = index % 2 === 0;
          const highlights = projectHighlights[project.id] || [];
          
          return (
            <div
              key={project.id}
              className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}
            >
              {/* Left Side: Mockup Wrapper (Browser frame for web, phone for app) */}
              <div className="w-full lg:w-[50%] flex justify-center z-10">
                <div
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  className="relative w-full aspect-video border border-white/15 bg-[#050510] rounded-2xl overflow-hidden cursor-pointer shadow-2xl transition-all duration-200 ease-out hover:border-white/25 group"
                  style={{ 
                    transformStyle: 'preserve-3d',
                    '--glare-x': '50%',
                    '--glare-y': '50%'
                  }}
                >
                  {/* Dynamic Glare Overlay */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20"
                    style={{
                      background: 'radial-gradient(circle at var(--glare-x) var(--glare-y), rgba(255,255,255,0.08) 0%, transparent 60%)'
                    }}
                  />

                  {/* Browser Window Bar (Aesthetic Header) */}
                  <div className="absolute top-0 left-0 w-full h-8 bg-white/10 border-b border-white/10 flex items-center px-4 justify-between z-35">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                    </div>
                    <div className="text-[10px] font-mono font-bold text-slate-250 bg-black/40 px-6 py-0.5 rounded border border-white/10 max-w-[200px] truncate">
                      {project.id}.ravi.dev
                    </div>
                    <div className="w-8"></div>
                  </div>

                  {/* Canvas Container */}
                  <div className="w-full h-full pt-8 relative overflow-hidden flex items-center justify-center">
                    {/* Project Image */}
                    {project.id === 'theway' && (
                      <img 
                        src={theway} 
                        alt={project.title} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                      />
                    )}

                    {/* App Mockup for foodio */}
                    {project.id === 'foodio' && (
                      <div className="w-full h-full bg-gradient-to-br from-dreamy-pink/15 via-dreamy-violet/15 to-dreamy-blue/15 flex items-center justify-center p-6 text-center select-none relative z-10">
                        <div className="relative w-44 h-64 border border-white/15 bg-[#050510] rounded-2xl shadow-xl p-4 flex flex-col justify-between" style={{ transform: 'translateZ(30px)' }}>
                          <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
                            <span className="text-[8px] font-bold text-white tracking-widest">FOODIO_APP</span>
                            <ShoppingBag className="w-3.5 h-3.5 text-dreamy-pink" />
                          </div>
                          <div className="space-y-2 flex-1 pt-2">
                            <div className="h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-between px-2.5">
                              <span className="text-[10px]">🍎</span>
                              <div className="w-16 h-2.5 bg-white/20 rounded flex-1 ml-2"></div>
                            </div>
                            <div className="h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-between px-2.5">
                              <span className="text-[10px]">🍔</span>
                              <div className="w-16 h-2.5 bg-white/20 rounded flex-1 ml-2"></div>
                            </div>
                          </div>
                          <div className="h-7 bg-gradient-to-r from-dreamy-pink to-dreamy-blue rounded-lg flex items-center justify-center">
                            <span className="text-[9px] font-bold text-slate-900 tracking-wider">CHECKOUT_PANEL</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Map Dashboard Mockup for stayfinder */}
                    {project.id === 'stayfinder' && (
                      <div className="w-full h-full bg-gradient-to-br from-dreamy-blue/15 via-dreamy-violet/15 to-dreamy-pink/15 flex items-center justify-center p-6 text-center select-none relative z-10">
                        <div className="relative w-64 h-40 border border-white/15 bg-[#050510] rounded-xl shadow-xl p-4 flex flex-col justify-between" style={{ transform: 'translateZ(30px)' }}>
                          <div className="flex justify-between items-center pb-2 border-b border-white/10">
                            <span className="text-[8px] font-bold text-white tracking-widest flex items-center gap-1"><Map className="w-3 h-3 text-dreamy-blue"/> STAYFINDER</span>
                            <span className="text-[7px] text-emerald-400 font-bold px-2 py-0.5 bg-emerald-500/10 rounded-full border border-emerald-500/20">LIVE_MAP</span>
                          </div>
                          <div className="flex-1 relative flex items-center justify-center my-1.5 opacity-60">
                            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:10px_10px]" />
                            <div className="w-12 h-12 rounded-full border border-dreamy-blue/30 animate-ping absolute" />
                            <div className="w-3 h-3 rounded-full bg-dreamy-blue absolute shadow-neon-blue" />
                          </div>
                          <div className="h-6 bg-white/5 border border-white/10 rounded-lg flex items-center justify-between px-3 text-[8px] text-slate-200 font-medium">
                            <span>Double Room Suite</span>
                            <span className="text-dreamy-pink font-bold">$120/night</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Scanline Effect (always visible) */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(255,255,255,0.05)_50%)] bg-[size:100%_4px] pointer-events-none opacity-20" />

                  {/* View indicator overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-center justify-center z-30">
                    <span className="text-[10px] text-white bg-slate-950/95 backdrop-blur-md px-3.5 py-1.5 border border-white/15 rounded-full tracking-wider font-bold uppercase shadow-lg">
                      {project.id === 'theway' ? 'EXPLORE_INTERFACE' : 'COMPILE_MOCKUP'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Side: Details & Highlights */}
              <div className="w-full lg:w-[50%] text-left flex flex-col justify-center">
                <span className="text-xs font-bold text-dreamy-pink tracking-widest uppercase mb-2">
                  PROJECT_0{index + 1}
                </span>
                <h4 className="text-3xl font-extrabold text-white tracking-wide mb-2 hover:text-gradient-dreamy transition-all duration-300">
                  {project.title}
                </h4>
                <h5 className="text-sm font-bold text-dreamy-blue mb-4">
                  {project.subtitle}
                </h5>
                <p className="text-slate-100 font-sans text-md leading-relaxed mb-6 font-medium">
                  {project.description}
                </p>

                {/* Challenges Checklist */}
                {highlights.length > 0 && (
                  <div className="mb-6 space-y-2.5">
                    <h6 className="text-[10px] font-bold text-slate-350 tracking-wider uppercase mb-3">Key Integrations</h6>
                    {highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-sm text-slate-100 font-medium">
                        <Sparkles className="w-3.5 h-3.5 text-dreamy-pink shrink-0 mt-1" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2.5 mb-8">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3.5 py-1.5 bg-white/10 border border-white/10 text-slate-100 font-semibold text-xs rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 border border-white/20 bg-white/10 text-slate-100 hover:text-white hover:bg-white/20 text-xs font-bold rounded-full transition-all duration-300 shadow-md"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                    </svg>
                    GITHUB_REPO
                  </a>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="flex items-center gap-2 px-5 py-2.5 border border-white/10 text-slate-350 hover:border-dreamy-pink hover:text-dreamy-pink text-xs font-bold rounded-full transition-all duration-300"
                  >
                    <ExternalLink className="w-4 h-4" />
                    LIVE_DEMO
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
