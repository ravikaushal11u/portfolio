import React from 'react';
import { Sparkles, Layers, Smartphone, Gamepad2 } from 'lucide-react';
import { portfolioData } from '../config/data';
import myimg from '../assets/myimg.jpeg';

const About = () => {
  const getIcon = (id) => {
    switch (id) {
      case 'web':
        return <Layers className="w-8 h-8 text-dreamy-pink" />;
      case 'app':
        return <Smartphone className="w-8 h-8 text-dreamy-blue" />;
      case 'game':
        return <Gamepad2 className="w-8 h-8 text-dreamy-violet" />;
      default:
        return <Layers className="w-8 h-8 text-dreamy-pink" />;
    }
  };

  return (
    <section id="about" className="py-24 px-6 max-w-7xl mx-auto relative">
      <div className="absolute top-10 right-0 w-72 h-72 bg-dreamy-blue/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Heading */}
      <div className="flex flex-col items-start mb-16 text-left">
        <h2 className="text-xs font-bold tracking-widest text-dreamy-blue uppercase mb-2">
          01. ABOUT & SERVICES
        </h2>
        <h3 className="text-3xl md:text-4xl font-black tracking-tight text-white m-0">
          WHO IS RAVI KAUSHAL?
        </h3>
        <div className="w-16 h-[3px] bg-gradient-to-r from-dreamy-pink to-dreamy-blue mt-4"></div>
      </div>

      {/* About Info & Image */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
        {/* Left Side: About Me text */}
        <div className="lg:col-span-7 text-left space-y-6">
          <h4 className="text-xl font-bold text-white tracking-wide">
            Bridging the gap between software engineering and creative interaction.
          </h4>
          <p className="text-slate-100 font-sans text-md leading-relaxed font-medium">
            {portfolioData.about}
          </p>
          <p className="text-slate-100 font-sans text-md leading-relaxed font-medium">
            With expertise in web development (creating interactive platforms), mobile apps (for seamless portability), and game design, I focus on performance, optimization, and stunning animations that elevate digital platforms.
          </p>

          <div className="p-4 border border-white/10 bg-slate-950/60 rounded-2xl flex items-start gap-4 shadow-md">
            <Sparkles className="w-6 h-6 text-dreamy-pink shrink-0 mt-0.5" />
            <div className="text-sm">
              <h5 className="text-white mb-1 font-bold">MY FOCUS</h5>
              <p className="text-slate-100 font-medium">Perfecting micro-interactions, layout transitions, and high-performance physics systems running natively at 60 FPS in browsers and mobile.</p>
            </div>
          </div>
        </div>

        {/* Right Side: Profile Image Frame */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-72 h-72 md:w-80 md:h-80 group">
            {/* Outer soft glowing circle behind image */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-dreamy-pink to-dreamy-blue rounded-full blur-[30px] opacity-35 group-hover:opacity-55 transition-opacity duration-700 pointer-events-none"></div>
            
            {/* Round Glassmorphism photo frame */}
            <div className="w-full h-full border border-white/15 bg-slate-950/80 rounded-full overflow-hidden flex items-center justify-center relative p-3 shadow-2xl z-10">
              
              <div className="w-full h-full rounded-full overflow-hidden relative">
                {/* Profile Image */}
                <img 
                  src={myimg} 
                  alt={portfolioData.name} 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-700"
                />
              </div>

              {/* Decorative Glass Overlay */}
              <div className="absolute inset-0 rounded-full border border-white/10 pointer-events-none"></div>

              {/* Hover overlay text */}
              <div className="absolute inset-0 rounded-full bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-center justify-center">
                <span className="text-[10px] text-white bg-slate-950/95 backdrop-blur-md px-3.5 py-1.5 border border-white/10 rounded-full tracking-wider font-bold uppercase shadow-lg">
                  HELLO_THERE
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
        {portfolioData.services.map((service, index) => (
          <div
            key={service.id}
            className="group relative glass-card p-8 rounded-2xl flex flex-col justify-between overflow-hidden shadow-xl"
          >
            {/* Glow overlay */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-dreamy-pink/10 to-dreamy-blue/10 rounded-full blur-[40px] transition-all duration-500 pointer-events-none" />

            <div>
              {/* Header */}
              <div className="mb-6 flex justify-between items-center">
                {getIcon(service.id)}
                <span className="text-xs text-slate-350 font-bold font-mono">0{index + 1}</span>
              </div>

              {/* Title */}
              <h4 className="text-xl font-bold text-white mb-4 tracking-wide group-hover:text-dreamy-pink transition-colors">
                {service.title}
              </h4>

              {/* Description */}
              <p className="text-slate-100 font-sans text-sm leading-relaxed mb-6 font-medium">
                {service.description}
              </p>
            </div>

            {/* Tech tag highlights */}
            <div className="flex flex-wrap gap-2 mt-auto">
              {service.tech.map((t) => (
                <span
                  key={t}
                  className="px-3.5 py-1 bg-white/10 border border-white/10 text-slate-100 font-semibold text-[10px] rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
