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
    // 1. Initial Hero Mount Animation (Fade & Slide up macOS window + Text elements without blur filter)
    gsap.fromTo(
      '#home .glass-card',
      {
        opacity: 0,
        y: 60,
        scale: 0.98
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.1
      }
    );

    // 2. Scroll Entrance Animation: Section Headings (Without blur)
    const headingIds = ['#about', '#skills', '#projects', '#contact'];
    headingIds.forEach((id) => {
      const heading = document.querySelector(`${id} h2`);
      const subheading = document.querySelector(`${id} h3`);
      const line = document.querySelector(`${id} .bg-gradient-to-r`);
      
      if (heading && subheading) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: heading,
            start: 'top 88%',
            toggleActions: 'play none none none',
          }
        });

        tl.fromTo(
          [heading, subheading],
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out' }
        );
        if (line) {
          tl.fromTo(
            line,
            { scaleX: 0, transformOrigin: 'left center' },
            { scaleX: 1, duration: 0.4, ease: 'power1.out' },
            '-=0.2'
          );
        }
      }
    });

    // 3. Scroll Entrance Animation: About Section Blocks (Without blur)
    const aboutWindow = document.querySelector('#about .lg\\:col-span-7');
    const aboutImage = document.querySelector('#about .lg\\:col-span-5');
    const serviceCards = document.querySelectorAll('#about .grid-cols-1 > div');

    if (aboutWindow && aboutImage) {
      gsap.fromTo(
        [aboutWindow, aboutImage],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: aboutWindow,
            start: 'top 83%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

    if (serviceCards.length > 0) {
      gsap.fromTo(
        serviceCards,
        { opacity: 0, y: 40, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: serviceCards[0],
            start: 'top 88%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

    // 4. Scroll Entrance Animation: Skills IDE Window (Without blur)
    const skillsIde = document.querySelector('#skills .bg-slate-950\\/80');
    if (skillsIde) {
      gsap.fromTo(
        skillsIde,
        { opacity: 0, y: 45, scale: 0.99 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: skillsIde,
            start: 'top 83%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

    // 5. Scroll Entrance Animation: Projects Rows (Each project fades & slides in individually without blur)
    const projectRows = document.querySelectorAll('#projects .space-y-32 > div');
    projectRows.forEach((row) => {
      const leftCol = row.querySelector('.lg\\:w-\\[50\\%\\]:first-child') || row.querySelector('div:first-child');
      const rightCol = row.querySelector('.lg\\:w-\\[50\\%\\]:last-child') || row.querySelector('div:last-child');
      
      if (row) {
        gsap.fromTo(
          [leftCol, rightCol],
          { opacity: 0, y: 45 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 83%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    });

    // 6. Scroll Entrance Animation: Contact Panel (Without blur)
    const contactGrid = document.querySelector('#contact .grid');
    const contactCols = document.querySelectorAll('#contact .grid > div');
    if (contactGrid && contactCols.length > 0) {
      gsap.fromTo(
        contactCols,
        { opacity: 0, y: 45 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contactGrid,
            start: 'top 83%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  }, []);

  return (
    <div className="relative min-h-screen text-slate-100 font-sans selection:bg-dreamy-pink selection:text-slate-900 bg-[#030308] overflow-x-hidden">
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
      <footer className="relative z-10 py-10 border-t border-white/10 text-center font-mono text-xs text-slate-400 bg-[#030308]/70 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>&copy; {new Date().getFullYear()} RAVI KAUSHAL. ALL RIGHTS RESERVED.</p>
          <p className="text-[10px] text-dreamy-pink/50 tracking-wider">
            STATUS: <span className="text-[#50fa7b] font-bold animate-pulse">OPTIMIZED</span> | CORE: REACT_VITE
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
