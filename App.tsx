
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Custom cursor animation
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    
    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: 'power3.out'
      });
      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1
      });
    };

    // Cursor hover effects
    const handleMouseEnter = () => {
      gsap.to(cursor, { scale: 2.5, opacity: 0.5, duration: 0.3 });
    };
    const handleMouseLeave = () => {
      gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 });
    };

    window.addEventListener('mousemove', moveCursor);
    
    // Add hover effect to interactive elements
    document.querySelectorAll('a, button, .hover-target').forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    // Smooth section reveals with stagger
    const sections = document.querySelectorAll('section');
    sections.forEach((section) => {
      // Animate section headings
      const heading = section.querySelector('h2');
      if (heading) {
        gsap.fromTo(
          heading,
          { opacity: 0, y: 80, skewY: 5 },
          {
            opacity: 1,
            y: 0,
            skewY: 0,
            duration: 1.2,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: heading,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Animate cards and grid items with stagger
      const cards = section.querySelectorAll('.animate-card');
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 100, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });

    // Parallax background elements
    gsap.utils.toArray('.parallax-bg').forEach((el: any) => {
      gsap.to(el, {
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });

    // Horizontal scroll text
    const scrollText = document.querySelector('.scroll-text');
    if (scrollText) {
      gsap.to(scrollText, {
        x: '-50%',
        ease: 'none',
        scrollTrigger: {
          trigger: scrollText,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      ScrollTrigger.getAll().forEach((t: any) => t.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-background-dark selection:bg-primary selection:text-background-dark overflow-x-hidden">
      {/* Custom Cursor */}
      <div 
        ref={cursorRef} 
        className="fixed w-10 h-10 border-2 border-primary rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden lg:block"
      />
      <div 
        ref={cursorDotRef} 
        className="fixed w-2 h-2 bg-primary rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden lg:block"
      />
      
      {/* <Navbar /> */}
      <main>
        <Hero />
        
        {/* QA Swag Marquee */}
        <div className="py-6 bg-primary/5 border-y border-primary/20 overflow-hidden">
          <div className="scroll-text flex whitespace-nowrap text-6xl font-black text-primary/10 uppercase tracking-widest font-display">
            <span className="mx-8">Quality Assurance</span>
            <span className="mx-8">•</span>
            <span className="mx-8">Zero Bug Policy</span>
            <span className="mx-8">•</span>
            <span className="mx-8">Test Automation</span>
            <span className="mx-8">•</span>
            <span className="mx-8">CI/CD Pipeline</span>
            <span className="mx-8">•</span>
            <span className="mx-8">Quality Assurance</span>
            <span className="mx-8">•</span>
            <span className="mx-8">Zero Bug Policy</span>
            <span className="mx-8">•</span>
            <span className="mx-8">Test Automation</span>
            <span className="mx-8">•</span>
            <span className="mx-8">CI/CD Pipeline</span>
            <span className="mx-8">•</span>
          </div>
        </div>
        
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;
