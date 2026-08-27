import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About ', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#030308]/90 backdrop-blur-md border-b border-white/10 py-4 shadow-lg' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 group font-sans text-xl font-bold tracking-wide text-white">
          <Sparkles className="w-5 h-5 text-dreamy-pink group-hover:rotate-45 transition-transform duration-500" />
          <span className="text-gradient-dreamy">
            Ravi Kaushal
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative text-sm tracking-wider text-slate-100 hover:text-white font-semibold transition-colors duration-300 group py-1"
            >
              {link.name}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-dreamy-pink to-dreamy-blue transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          <a
            href="#contact"
            className="px-5 py-2 bg-gradient-to-r from-dreamy-pink to-dreamy-blue text-slate-900 font-bold text-xs tracking-widest rounded-full hover:opacity-95 shadow-md shadow-dreamy-pink/10 transition-all duration-300"
          >
            LET'S TALK
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-slate-100 hover:text-white focus:outline-none transition-colors"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Links */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-[#030308]/95 backdrop-blur-xl border-b border-white/10 transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'}`}>
        <div className="flex flex-col items-center gap-6 py-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-md tracking-wider text-slate-100 hover:text-white font-semibold transition-colors duration-300"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="px-6 py-2 bg-gradient-to-r from-dreamy-pink to-dreamy-blue text-slate-900 font-bold text-sm tracking-wider rounded-full hover:opacity-95 transition-all duration-300"
          >
            LET'S TALK
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
