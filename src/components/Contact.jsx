import React, { useState } from 'react';
import { Send, Mail, Phone, MapPin } from 'lucide-react';
import { portfolioData } from '../config/data';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('SENDING...');
    
    // --- EMAILJS CONFIGURATION ---
    const serviceId = 'service_33dt99d';
    const templateId = 'template_qy72bbw';
    const publicKey = 'SYjzensbfpdxCg1mJ';

    if (serviceId.includes('YOUR_') || templateId.includes('YOUR_') || publicKey.includes('YOUR_')) {
      // Graceful fallback simulation mode
      setTimeout(() => {
        setStatus('SIMULATED_SEND_SUCCESS');
        setFormState({ name: '', email: '', message: '' });
        setTimeout(() => setStatus(''), 4000);
      }, 1200);
      return;
    }

    const templateParams = {
      from_name: formState.name,
      from_email: formState.email,
      to_name: 'Ravi Kaushal',
      message: formState.message,
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setStatus('MESSAGE_SENT_SUCCESSFULLY');
        setFormState({ name: '', email: '', message: '' });
        setTimeout(() => setStatus(''), 4000);
      }, (err) => {
        console.error('FAILED...', err);
        setStatus('SENDING_FAILED_TRY_AGAIN');
        setTimeout(() => setStatus(''), 4000);
      });
  };

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-24 px-6 max-w-7xl mx-auto relative">
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-dreamy-pink/5 rounded-full blur-[90px] pointer-events-none" />

      {/* Heading */}
      <div className="flex flex-col items-start mb-16 text-left">
        <h2 className="text-xs font-bold tracking-widest text-dreamy-blue uppercase mb-2">
          04. REACH OUT & CONNECT
        </h2>
        <h3 className="text-3xl md:text-4xl font-black tracking-tight text-white m-0">
          GET IN TOUCH
        </h3>
        <div className="w-16 h-[3px] bg-gradient-to-r from-dreamy-pink to-dreamy-blue mt-4"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
        
        {/* Left Side: Contact Information (Styled as macOS Window) */}
        <div className="lg:col-span-5 flex flex-col z-10 w-full">
          <div className="w-full bg-slate-950/80 backdrop-blur-md border border-white/15 p-6 rounded-2xl font-mono text-xs text-slate-100 text-left relative overflow-hidden shadow-2xl flex flex-col h-full justify-between min-h-[360px]">
            <div>
              {/* macOS Title Bar Controls */}
              <div className="flex gap-1.5 border-b border-white/10 pb-3 mb-5 items-center">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                <span className="text-[10px] text-slate-400 font-bold ml-2">network_protocols.md</span>
              </div>

              <h4 className="text-xl font-black text-white tracking-wide mb-4 uppercase font-sans">
                LET'S COLLABORATE
              </h4>
              <p className="text-slate-100 font-sans text-xs leading-relaxed mb-8 font-medium">
                Got a project in mind, want to build an app, website, or game, or just want to say hi? Hit me up through the form or ping me on my social nodes.
              </p>

              <div className="space-y-4 text-xs font-mono font-semibold">
                <div className="flex items-center gap-3 text-slate-100">
                  <Mail className="w-4 h-4 text-dreamy-pink" />
                  <span>{portfolioData.socials.email}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-100">
                  <Phone className="w-4 h-4 text-dreamy-blue" />
                  <span>+91 XXXXX XXXXX</span>
                </div>
                <div className="flex items-center gap-3 text-slate-100">
                  <MapPin className="w-4 h-4 text-dreamy-violet" />
                  <span>India</span>
                </div>
              </div>
            </div>

            {/* Social Links Node Box */}
            <div className="mt-8 border-t border-white/10 pt-4">
              <h5 className="text-[9px] text-slate-450 font-bold tracking-wider mb-4 uppercase font-mono">
                // ACTIVE_SOCIAL_NODES
              </h5>
              <div className="flex gap-3">
                {/* GitHub */}
                <a
                  href={portfolioData.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-10 h-10 border border-white/15 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 hover:scale-105 transition-all duration-300"
                >
                  <svg className="w-4.5 h-4.5 text-slate-100 group-hover:text-dreamy-pink fill-current transition-colors" viewBox="0 0 24 24">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href={portfolioData.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-10 h-10 border border-white/15 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 hover:scale-105 transition-all duration-300"
                >
                  <svg className="w-4.5 h-4.5 text-slate-100 group-hover:text-dreamy-blue fill-current transition-colors" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href={portfolioData.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-10 h-10 border border-white/15 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 hover:scale-105 transition-all duration-300"
                >
                  <svg className="w-4.5 h-4.5 text-slate-100 group-hover:text-dreamy-violet fill-current transition-colors" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form (Styled as macOS Window) */}
        <div className="lg:col-span-7 z-10 w-full">
          <form
            onSubmit={handleSubmit}
            className="relative bg-slate-950/80 border border-white/15 p-6 rounded-2xl space-y-5 shadow-2xl flex flex-col"
          >
            {/* macOS Title Bar Controls */}
            <div className="flex gap-1.5 border-b border-white/10 pb-3 mb-2 items-center">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
              <span className="text-[10px] text-slate-400 font-bold ml-2">dispatch_message.sh</span>
            </div>

            {/* Input Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-[10px] font-bold text-dreamy-blue uppercase tracking-widest font-mono">
                &gt; SENDER_NAME
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formState.name}
                onChange={handleChange}
                placeholder="INPUT NAME..."
                className="w-full glass-input rounded-xl p-3 text-xs focus:outline-none font-medium font-mono"
              />
            </div>

            {/* Input Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-[10px] font-bold text-dreamy-blue uppercase tracking-widest font-mono">
                &gt; SENDER_EMAIL
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formState.email}
                onChange={handleChange}
                placeholder="INPUT EMAIL..."
                className="w-full glass-input rounded-xl p-3 text-xs focus:outline-none font-medium font-mono"
              />
            </div>

            {/* Input Message */}
            <div className="space-y-2">
              <label htmlFor="message" className="block text-[10px] font-bold text-dreamy-blue uppercase tracking-widest font-mono">
                &gt; MESSAGE_BODY
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows="4"
                value={formState.message}
                onChange={handleChange}
                placeholder="ENTER MESSAGE DATA..."
                className="w-full glass-input rounded-xl p-3 text-xs focus:outline-none resize-none font-medium font-mono"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!!status}
              className={`w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-dreamy-pink to-dreamy-blue text-slate-900 font-extrabold text-xs tracking-wider rounded-xl hover:opacity-95 shadow-md shadow-dreamy-pink/20 hover:scale-[1.01] transition-all duration-300 font-mono ${status ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {status ? (
                <span className="text-slate-900 font-bold">{status}</span>
              ) : (
                <>
                  TRANSMIT_DATA
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};

export default Contact;
