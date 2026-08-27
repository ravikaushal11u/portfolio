import React, { useState } from 'react';
import { portfolioData } from '../config/data';

const techLogos = {
  JavaScript: (
    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="#F7DF1E">
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M1.5 1.5v21h21v-21H1.5zm19.5 19.5h-5.25v-3.75h3.75v3.75zm-6.75 0H9v-5.25h5.25v5.25zm-6.75 0H2.25V9H9v12H7.5z" fill="none" />
      <path d="M24 0H0v24h24V0zM12.27 18.53c-.3 1.77-1.78 2.22-3.17 2.22-2.3 0-3.32-1.07-3.66-2.12l1.7-1c.2 1 .73 1.37 1.83 1.37 1.05 0 1.5-.47 1.5-1.78v-8.25h2.1v8.28c0 .28-.3 1.28-2.3 1.28zm8.68-.28c-.37 1.35-1.57 2.5-3.65 2.5-2.2 0-3.74-1.22-3.74-3.64 0-2.6 1.62-3.78 3.86-3.78 2.45 0 3.53 1.25 3.53 3.25v.75H15.6c0 1.28.8 1.88 1.93 1.88 1.15 0 1.77-.52 2.07-1.2l1.35.76zm-1.83-2.58c0-.98-.55-1.5-1.56-1.5-1.05 0-1.63.63-1.75 1.5h3.3z" />
    </svg>
  ),
  React: (
    <svg className="w-12 h-12" viewBox="-11.5 -10.23174 23 20.46348">
      <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
      <g stroke="#61DAFB" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2"/>
        <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
        <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
      </g>
    </svg>
  ),
  "React Native": (
    <svg className="w-12 h-12" viewBox="-11.5 -10.23174 23 20.46348">
      <circle cx="0" cy="0" r="2.05" fill="#a1c4fd"/>
      <g stroke="#a1c4fd" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2"/>
        <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
        <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
      </g>
    </svg>
  ),
  "Three.js": (
    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.5">
      <polygon points="12,2 2,22 22,22" />
      <polygon points="12,2 12,22" strokeDasharray="2,2" />
      <polygon points="2,22 12,12 22,22" />
    </svg>
  ),
  GSAP: (
    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="#88CE02">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" fill="none" />
      <path d="M4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.25-.29 2.43-.8 3.5l-1.45-1.45C18 13.23 18 12.62 18 12c0-3.31-2.69-6-6-6s-6 2.69-6 6c0 1.66.67 3.16 1.76 4.24l-1.42 1.42C5.07 16.27 4 14.26 4 12zm8 4c-2.21 0-4-1.79-4-4 0-.83.26-1.6.69-2.25l1.47 1.47C10.06 11.47 10 11.73 10 12c0 1.1.9 2 2 2 .27 0 .53-.06.78-.16l1.47 1.47c-.65.43-1.42.69-2.25.69zm8 0c0 4.41-3.59 8-8 8s-8-3.59-8-8c0-1.25.29-2.43.8-3.5l1.45 1.45C7 10.77 7 11.38 7 12c0 3.31 2.69 6 6 6s6-2.69 6-6c0-1.66-.67-3.16-1.76-4.24l1.42-1.42C18.93 7.73 20 12 20 12z" />
    </svg>
  ),
  "Node.js": (
    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="#339933">
      <path d="M12 2L3.5 6.9v10.2L12 22l8.5-4.9V6.9L12 2zm6.7 13.9l-6.7 3.9-6.7-3.9V8.1l6.7-3.9 6.7 3.9v7.8z" />
      <path d="M12 6.5l4.3 2.5v5l-4.3 2.5-4.3-2.5v-5L12 6.5zm0 1.8L9.2 9.9v3.3l2.8 1.6 2.8-1.6V9.9L12 8.3z" />
    </svg>
  ),
  "Spring Boot": (
    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="#6DB33F">
      <path d="M12 0a12 12 0 100 24 12 12 0 000-24zm3.93 17.51a5.6 5.6 0 01-5.59-4.88c.07-.02.15-.04.22-.05a6.97 6.97 0 007.82-3.13 5.56 5.56 0 01-2.45 8.06zm.71-7.8a3.11 3.11 0 00-3.26-1.42 2.65 2.65 0 012.39-1.22c.26 0 .5.04.72.11a3.1 3.1 0 012.21 2.87 2.67 2.67 0 01-2.06.66z"/>
    </svg>
  ),
  Django: (
    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="#092E20">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.1 14.5c-.7.6-1.5.9-2.5.9-1.9 0-3.3-1.4-3.3-3.7V9.4H9.3V7.2h1.7V4.5h2.6v2.7h2.9v2.2h-2.9v4.2c0 .8.4 1.2 1.1 1.2.4 0 .7-.1 1-.3v2.3z" />
    </svg>
  ),
  Flask: (
    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.5">
      <path d="M9 3h6v4l5 9v3a2 2 0 01-2 2H6a2 2 0 01-2-2v-3l5-9V3z" />
      <path d="M6 15h12" strokeWidth="1" />
      <path d="M9 3h6" />
    </svg>
  ),
  HTML5: (
    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="#E34F26">
      <path d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0zm17.3 18.8l1.4-15.5H3.8l1.4 15.5 6.8 2.2 6.8-2.2z" fill="none" />
      <path d="M3.8 3.3h16.4l-1.6 18-6.6 2.2-6.6-2.2-1.6-18zm8.2 8.9v-2.7h5l-.2 2.7H12zm0 5.4l2.8-.9.3-3.1H12v2.7h1.4l-.1.8-1.3.4v.1zm-3-5.4H6.7l.2-2.7H12v2.7H9.2zm0 1.4H12v2.7H8.8l-.1-.8-.3-3.3H6.7l.5 5.5 4.8 1.6v-5.7z" />
    </svg>
  ),
  CSS3: (
    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="#1572B6">
      <path d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0zm17.3 18.8l1.4-15.5H3.8l1.4 15.5 6.8 2.2 6.8-2.2z" fill="none" />
      <path d="M3.8 3.3h16.4l-1.6 18-6.6 2.2-6.6-2.2-1.6-18zm8.2 8.9v-2.7h5.1l-.5 5.4-4.6 1.5v-4.2zm-3-2.7H6.7l.5 5.5 4.8 1.6v-2.7l-2.4-.8-.1-1.3h2.5V9.5H9.2zm0-2.7h2.8v2.7H6.5l.2-2.7z" />
    </svg>
  ),
  Unity: (
    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="#ffffff">
      <path d="M12 2L2 7.8v10.4L12 24l10-5.8V7.8L12 2zm8.2 6.4L13 12.8v8.6l7.2-4.2V8.4zM11 21.4v-8.6L3.8 8.4v7.8l7.2 4.2zm1-9.9l7.2-4.2L12 3.1 4.8 7.3 12 11.5z" />
    </svg>
  ),
  "C++": (
    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="#00599C">
      <path d="M22 11h-2V9h-2v2h-2v2h2v2h2v-2h2v-2zm-6 2H9.2c.4 1.3 1.6 2.2 3 2.2 1.3 0 2.4-.7 2.8-1.8l1.7.7C16.1 16.5 14.2 18 12.2 18 9.3 18 7 15.7 7 12.8s2.3-5.2 5.2-5.2c2.1 0 3.9 1.4 4.5 3.3l-1.7.7c-.4-1-1.5-1.7-2.8-1.7-1.4 0-2.6.9-3 2.2h9.4c.1-.4.1-.7.1-1.1 0-3.3-2.7-6-6-6S6.2 8.5 6.2 11.8s2.7 6 6 6c2.4 0 4.5-1.4 5.4-3.5h-1.6zm6-6h-2V5h-2v2h-2v2h2v2h2V9h2V7z" />
    </svg>
  ),
  Python: (
    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="#3776AB">
      <path d="M11.9 2C6.9 2 7 4.2 7 4.2l.1 1.7h4.8v.7H5.2S2 6.9 2 11.9s2.7 5 2.7 5h1.6v-2.3c0-2.5 2-4.5 4.5-4.5h4.8S19 10 19 5.2s-2.2-3.2-7.1-3.2zm-2.4 1.8c.5 0 1 .4 1 1s-.5 1-1 1-1-.4-1-1 .5-1 1-1zm2.5 18.2c5 0 4.9-2.2 4.9-2.2l-.1-1.7H12v-.7h6.8s3.2-.3 3.2-5.2-2.7-5-2.7-5h-1.6v2.3c0 2.5-2 4.5-4.5 4.5H8.4S5 14 5 18.8s2.2 3.2 7.1 3.2zm2.4-1.8c-.5 0-1-.4-1-1s.5-1 1-1 1 .4 1 1-.5 1-1 1z" />
    </svg>
  ),
  Git: (
    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="#F05032">
      <path d="M23.2 11.2L12.8.8c-.5-.5-1.3-.5-1.8 0L8.6 3.1l3 3c.6-.2 1.3-.1 1.8.4.5.5.6 1.2.3 1.8l3 3c.6-.3 1.3-.2 1.8.3.7.7.7 1.9 0 2.6s-1.9.7-2.6 0c-.5-.5-.6-1.2-.3-1.8l-3-3v4.3c.6.3 1 .9 1 1.6 0 1-.8 1.8-1.8 1.8s-1.8-.8-1.8-1.8c0-.7.4-1.3 1-1.6V8.6c-.6-.3-1-.9-1-1.6 0-.3.1-.6.2-.8l-3-3L.8 11.2c-.5.5-.5 1.3 0 1.8l10.4 10.4c.5.5 1.3.5 1.8 0l10.4-10.4c.3-.5.3-1.3-.2-1.8z" />
    </svg>
  )
};

const hoverGlowColors = {
  JavaScript: "rgba(247, 223, 30, 0.25)",
  React: "rgba(97, 218, 251, 0.25)",
  "React Native": "rgba(161, 196, 253, 0.25)",
  "Three.js": "rgba(255, 255, 255, 0.25)",
  GSAP: "rgba(136, 206, 2, 0.25)",
  "Node.js": "rgba(51, 153, 51, 0.25)",
  "Spring Boot": "rgba(109, 179, 63, 0.25)",
  Django: "rgba(9, 46, 32, 0.25)",
  Flask: "rgba(255, 255, 255, 0.2)",
  HTML5: "rgba(227, 79, 38, 0.25)",
  CSS3: "rgba(21, 114, 182, 0.25)",
  Unity: "rgba(255, 255, 255, 0.25)",
  "C++": "rgba(0, 89, 156, 0.25)",
  Python: "rgba(55, 118, 171, 0.25)",
  Git: "rgba(240, 80, 50, 0.25)"
};

const skillLevels = {
  JavaScript: "Expert",
  React: "Expert",
  "React Native": "Advanced",
  "Three.js": "Advanced",
  GSAP: "Advanced",
  "Node.js": "Advanced",
  "Spring Boot": "Advanced",
  Django: "Advanced",
  Flask: "Advanced",
  HTML5: "Expert",
  CSS3: "Expert",
  Unity: "Intermediate",
  "C++": "Intermediate",
  Python: "Intermediate",
  Git: "Advanced"
};

const Skills = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filterTabs = [
    { id: 'all', label: 'All Stack' },
    { id: 'web', label: 'Web Front-end' },
    { id: 'mobile_game', label: 'Mobile & Games' },
    { id: 'languages', label: 'Languages' },
    { id: 'others', label: 'Backend & Tools' }
  ];

  const getFilteredSkills = () => {
    const list = portfolioData.skills;
    if (activeFilter === 'all') return list;
    if (activeFilter === 'web') {
      return list.filter(s => ['frontend', 'animation', '3D/Graphics'].includes(s.category) && s.name !== 'Unity');
    }
    if (activeFilter === 'mobile_game') {
      return list.filter(s => ['mobile', 'game'].includes(s.category) || s.name === 'Unity' || s.name === 'Three.js');
    }
    if (activeFilter === 'languages') {
      return list.filter(s => s.category === 'language');
    }
    if (activeFilter === 'others') {
      return list.filter(s => ['backend', 'tool'].includes(s.category));
    }
    return list;
  };

  const filteredSkills = getFilteredSkills();

  return (
    <section id="skills" className="py-24 px-6 max-w-7xl mx-auto relative">
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-dreamy-pink/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Heading */}
      <div className="flex flex-col items-start mb-12 text-left">
        <h2 className="text-xs font-bold tracking-widest text-dreamy-blue uppercase mb-2">
          02. CORE STACK & EXPERTISE
        </h2>
        <h3 className="text-3xl md:text-4xl font-black tracking-tight text-white m-0">
          LANGUAGES, FRAMEWORKS & ENGINES
        </h3>
        <div className="w-16 h-[3px] bg-gradient-to-r from-dreamy-pink to-dreamy-blue mt-4"></div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2.5 mb-12 justify-start pb-4 border-b border-white/10">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 ${
              activeFilter === tab.id
                ? 'bg-gradient-to-r from-dreamy-pink to-dreamy-blue text-slate-900 shadow-md'
                : 'bg-slate-950/80 border border-white/10 text-slate-100 hover:bg-white/10 hover:text-white hover:scale-102'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 transition-all duration-500">
        {filteredSkills.map((skill) => {
          const glowColor = hoverGlowColors[skill.name] || "rgba(255,255,255,0.05)";
          return (
            <div
              key={skill.name}
              className="group relative glass-card p-6 rounded-2xl flex flex-col items-center justify-between h-44 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 shadow-lg"
            >
              {/* Radial glow background on hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, ${glowColor} 0%, transparent 70%)`
                }}
              />

              {/* Logo Container */}
              <div className="flex items-center justify-center h-20 w-20 relative z-10 transition-transform duration-500 group-hover:scale-105">
                {techLogos[skill.name] || (
                  <div className="w-12 h-12 flex items-center justify-center bg-white/10 border border-white/15 rounded-full text-dreamy-pink font-semibold">
                    {skill.name.slice(0, 2).toUpperCase()}
                  </div>
                )}
              </div>

              {/* Tech Name & Status */}
              <div className="text-center z-10 w-full mt-2">
                <h4 className="text-sm font-bold text-white tracking-wide group-hover:text-dreamy-pink transition-all mb-1">
                  {skill.name}
                </h4>
                
                {/* Micro level tag */}
                <div className="inline-block px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-[9px] font-bold font-mono tracking-widest text-slate-100 uppercase transition-all">
                  {skillLevels[skill.name] || "Intermediate"}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;
