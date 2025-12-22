
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const Navbar: React.FC = () => {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Initial animation
    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: 'expo.out',
      delay: 0.5
    });

    // Stagger nav links
    gsap.from('.nav-link', {
      y: -20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
      delay: 0.8
    });

    // Scroll handler
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header ref={navRef} className={`sticky top-0 z-50 w-full transition-all duration-500 ${scrolled ? 'bg-background-dark/95 backdrop-blur-xl border-b border-border-dark shadow-lg shadow-black/20' : 'bg-transparent border-b border-transparent'}`}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative">
            <span className="material-symbols-outlined text-primary text-3xl group-hover:scale-110 transition-transform">terminal</span>
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-white font-display group-hover:text-primary transition-colors">Hamad Raza</h1>
            <p className="text-[10px] text-primary/60 font-mono uppercase tracking-widest -mt-1">QA Engineer</p>
          </div>
        </a>
        
        <nav className="hidden md:flex items-center gap-1">
          {['About', 'Skills', 'Experience', 'Projects'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="nav-link relative px-5 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors group"
            >
              {item}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 rounded-full"></span>
            </a>
          ))}
        </nav>
        
        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="nav-link hidden sm:inline-flex h-12 items-center justify-center rounded-xl bg-primary px-6 py-2 text-sm font-black text-background-dark shadow-lg shadow-primary/30 transition-all hover:shadow-primary/50 hover:scale-105 active:scale-95 relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></span>
            <span className="relative flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">handshake</span>
              Hire Me
            </span>
          </a>
          <button className="md:hidden text-white hover:text-primary transition-colors p-2">
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
