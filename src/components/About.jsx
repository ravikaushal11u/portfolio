import React from 'react';
import { Sparkles, Layers, Smartphone, Gamepad2 } from 'lucide-react';
import { portfolioData } from '../config/data';
import myimg from '../assets/myimg.jpeg';

const About = () => {
  const getIcon = (id) => {
    switch (id) {
      case 'web':
        return <Layers className="w-5 h-5 text-dreamy-pink" />;
      case 'app':
        return <Smartphone className="w-5 h-5 text-dreamy-blue" />;
      case 'game':
        return <Gamepad2 className="w-5 h-5 text-dreamy-violet" />;
      default:
        return <Layers className="w-5 h-5 text-dreamy-pink" />;
    }
  };

  return (
    <section id="about" className="py-24 px-6 max-w-7xl mx-auto relative">
      <div className="absolute top-10 right-0 w-72 h-72 bg-dreamy-blue/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Heading */}
      <div className="flex flex-col items-start mb-16 text-left">
    

        
        
        <div className="w-16 h-[3px] bg-gradient-to-r from-dreamy-pink to-dreamy-blue mt-4"></div>
      </div>

      {/* About Info & Image */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
        
        {/* Left Side: macOS Code Window style Profile Info */}
        <div className="lg:col-span-7 flex flex-col z-10 w-full">
          <div className="w-full bg-slate-950/80 backdrop-blur-md border border-white/15 p-6 rounded-2xl font-mono text-xs text-slate-100 text-left relative overflow-hidden shadow-2xl flex flex-col h-full">
            {/* macOS Title Bar Controls */}
            <div className="flex gap-1.5 border-b border-white/10 pb-3 mb-4 items-center justify-between">
              <div className="flex gap-1.5 items-center">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                <span className="text-[10px] text-slate-400 font-bold ml-2">profile_overview.md</span>
              </div>
              <span className="text-[9px] text-[#8be9fd] font-bold font-mono tracking-widest">ABOUT_ME</span>
            </div>

            {/* Markdown Styled Code Content */}
            <div className="space-y-4 font-sans text-sm text-slate-200 leading-relaxed">
              <div>
                <h4 className="text-[#ff79c6] font-mono text-xs font-bold uppercase tracking-wider mb-1"># Ravi Kaushal</h4>
                <p className="text-white font-extrabold text-md tracking-wide">
                  Bridging the gap between software engineering and creative interaction.
                </p>
              </div>
              
              <div className="border-t border-white/5 pt-3">
    
                <p className="text-slate-200 font-medium">
                  {portfolioData.about}
                </p>
              </div>

              <div className="border-t border-white/5 pt-3">
                
                <p className="text-slate-200 font-medium">
                  With expertise in Web Development (creating interactive platforms), Mobile Apps (for seamless portability), and Game Design, I focus on performance, optimization, and stunning animations that elevate digital platforms.
                </p>
              </div>

              <div className="border-t border-white/10 pt-4 flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-dreamy-pink shrink-0" />
                <div className="text-xs">
                  <span className="text-white font-bold block uppercase tracking-wider">Operational Target</span>
                  <span className="text-slate-350 font-medium">Perfecting micro-interactions, layout transitions, and high-performance physics systems running natively at 60 FPS in browsers and mobile.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Clean Profile Image */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-72 h-72 md:w-80 md:h-80 group">
            {/* Soft backdrop glow */}
            <div className="absolute -inset-3 bg-gradient-to-tr from-dreamy-pink to-dreamy-blue rounded-full blur-[20px] opacity-25 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"></div>
            
            {/* Opaque Sharp Glassmorphic photo container */}
            <div className="w-full h-full border border-white/15 bg-slate-950/90 rounded-full overflow-hidden flex items-center justify-center relative p-3.5 shadow-2xl z-10">
              
              <div className="w-full h-full rounded-full overflow-hidden relative bg-black">
                {/* Profile Image (Crisp rendering, high contrast, full color) */}
                <img 
                  src={myimg} 
                  alt={portfolioData.name} 
                  className="w-full h-full object-cover scale-102 hover:scale-105 transition-transform duration-500"
                  style={{
                    imageRendering: 'auto',
                    filter: 'contrast(1.05) brightness(1.02)'
                  }}
                />
              </div>

              {/* Precise Border Overlay */}
              <div className="absolute inset-3.5 rounded-full border border-white/10 pointer-events-none"></div>

              {/* Simple Clean Indicator */}
              <div className="absolute bottom-6 right-6 z-20">
                <span className="text-[9px] text-white bg-slate-950/90 backdrop-blur-md px-3 py-1 border border-white/15 rounded-full tracking-widest font-bold uppercase shadow-lg">
                  
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid (Styled as macOS Terminal Windows) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
        {portfolioData.services.map((service, index) => (
          <div
            key={service.id}
            className="group relative bg-slate-950/85 border border-white/15 p-6 rounded-2xl flex flex-col justify-between overflow-hidden shadow-2xl min-h-[300px]"
          >
            {/* macOS Title Bar Controls */}
            <div className="flex gap-1.5 border-b border-white/10 pb-3 mb-5 items-center justify-between">
              <div className="flex gap-1.5 items-center">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                <span className="text-[10px] text-slate-400 font-bold font-mono ml-2">
                  {service.id === 'web' ? 'web_service.sh' : service.id === 'app' ? 'app_service.sh' : 'game_service.sh'}
                </span>
              </div>
              {getIcon(service.id)}
            </div>

            <div className="flex-1 flex flex-col justify-between">
              <div>
                {/* Title */}
                <h4 className="text-lg font-bold text-white mb-3 tracking-wide group-hover:text-dreamy-pink transition-colors">
                  {service.title}
                </h4>

                {/* Description */}
                <p className="text-slate-100 font-sans text-xs leading-relaxed mb-6 font-medium">
                  {service.description}
                </p>
              </div>

              {/* Tech tag highlights */}
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {service.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 bg-white/5 border border-white/10 text-slate-100 font-mono text-[9px] rounded-lg"
                  >
                    "{t}"
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
