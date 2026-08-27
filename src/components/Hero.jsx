import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { portfolioData } from '../config/data';

const Hero = () => {
  const [text, setText] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const titles = portfolioData.titles;

  useEffect(() => {
    const currentTitle = titles[titleIndex];
    let timer;

    if (isDeleting) {
      timer = setTimeout(() => {
        setText(currentTitle.substring(0, text.length - 1));
      }, 50);
    } else {
      timer = setTimeout(() => {
        setText(currentTitle.substring(0, text.length + 1));
      }, typingSpeed);
    }

    if (!isDeleting && text === currentTitle) {
      timer = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % titles.length);
      setTypingSpeed(100);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, titleIndex, titles]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden pt-25">
      {/* Ambient gradient backgrounds */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-dreamy-pink/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-dreamy-blue/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Glass Deck Container */}
      <div className="relative max-w-4xl w-full glass-card p-8 md:p-14 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center gap-12 z-10">
        
        {/* Soft dot indicators */}
        <div className="absolute top-6 left-6 flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-dreamy-pink/80"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-dreamy-violet/80"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-dreamy-blue/80"></span>
        </div>

        {/* Hero Left Content */}
        <div className="flex-1 flex flex-col items-start text-left">
          {/* Status Badge */}
          <div className="flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 text-slate-100 text-xs font-semibold rounded-full mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-dreamy-pink animate-spin duration-3000" />
            <span>AVAILABLE FOR CREATIVE CONTRACTS</span>
          </div>

          <h2 className="text-xs font-bold tracking-widest text-dreamy-blue uppercase mb-2">
            HELLO, I AM
          </h2>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white m-0 mb-4 drop-shadow-md">
            {portfolioData.name}
          </h1>

          {/* Typing Title */}
          <div className="h-12 flex items-center mb-6">
            <span className="text-2xl md:text-3xl font-extrabold text-gradient-dreamy">
              {text}
            </span>
            <span className="w-[3px] h-8 bg-dreamy-pink ml-1 animate-pulse" />
          </div>

          <p className="text-slate-100 font-sans text-md md:text-lg mb-8 leading-relaxed max-w-xl font-medium">
            {portfolioData.tagline}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-dreamy-pink to-dreamy-blue text-slate-900 font-bold text-sm rounded-full hover:opacity-95 shadow-lg shadow-dreamy-pink/30 hover:scale-105 transition-all duration-300"
            >
              EXPLORE MY WORK
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="flex items-center gap-2 px-6 py-3.5 border border-white/20 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-full hover:scale-105 transition-all duration-300"
            >
              SAY HELLO
            </a>
          </div>
        </div>

        {/* Hero Right Code Visualizer (macOS Window Style in Glassmorphism) */}
        <div className="hidden lg:flex w-80 flex-col bg-slate-950/80 backdrop-blur-md border border-white/15 p-5 rounded-2xl font-mono text-xs text-slate-100 text-left relative overflow-hidden shadow-2xl z-10">
          {/* macOS Title Bar Controls */}
          <div className="flex gap-1.5 border-b border-white/10 pb-3 mb-3 items-center">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
            <span className="text-[10px] text-slate-400 font-bold ml-2">developer.json</span>
          </div>
          
          {/* JSON Code block matching original screenshot */}
          <div className="space-y-1.5 leading-relaxed font-semibold">
            <div><span className="text-[#ff79c6]">const</span> dev = &#123;</div>
            <div className="pl-4">name: <span className="text-[#50fa7b]">"Ravi Kaushal"</span>,</div>
            <div className="pl-4">role: <span className="text-[#50fa7b]">"Fullstack Creative"</span>,</div>
            <div className="pl-4">skills: [</div>
            <div className="pl-8 text-[#8be9fd]">"Web", "App", "Game"</div>
            <div className="pl-4">],</div>
            <div className="pl-4">status: <span className="text-[#50fa7b]">"Always Coding"</span>,</div>
            <div className="pl-4">coffeeLevel: <span className="text-[#ff79c6]">99</span></div>
            <div>&#125;;</div>
            <div className="pt-2 text-slate-400 font-medium">// Processing stack...</div>
            <div className="text-[#50fa7b] font-bold">&gt; RUN dev.buildPortfolio()</div>
            <div className="text-[#8be9fd] font-bold">Success: 60fps achieved.</div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
