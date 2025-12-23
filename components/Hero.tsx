
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const magneticRef = useRef<HTMLAnchorElement>(null);
  const glitchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline for coordinated hero entry
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      
      // Glitch effect on load
      tl.fromTo('.glitch-layer', 
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 0.1, stagger: 0.05 }
      );

      // Main text reveal with split effect
      tl.from('.hero-reveal', {
        y: 100,
        opacity: 0,
        rotationX: -45,
        transformOrigin: 'top center',
        duration: 1.4,
        stagger: 0.12,
      }, 0.3);

      // Typing cursor effect
      gsap.to('.typing-cursor', {
        opacity: 0,
        repeat: -1,
        yoyo: true,
        duration: 0.5,
        ease: 'steps(1)'
      });

      // QA Badge pulse animation
      gsap.to('.qa-pulse', {
        boxShadow: '0 0 40px rgba(43, 238, 238, 0.6), 0 0 80px rgba(43, 238, 238, 0.3)',
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: 'sine.inOut'
      });

      // Background particles animation with random floating
      const particles = document.querySelectorAll('.tech-particle');
      particles.forEach((p, i) => {
        gsap.set(p, { opacity: 0 });
        gsap.to(p, {
          opacity: 0.6,
          y: "random(-60, 60)",
          x: "random(-60, 60)",
          rotation: "random(-180, 180)",
          scale: "random(0.5, 1.5)",
          duration: "random(4, 8)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.3
        });
      });

      // Floating code snippets
      gsap.to('.code-float', {
        y: -20,
        rotation: 3,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.5
      });

      // Mouse Parallax Effect
      const handleMouseMove = (e: MouseEvent) => {
        if (!imageRef.current || !containerRef.current) return;
        
        const { clientX, clientY } = e;
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        
        const xPos = (clientX - left) / width - 0.5;
        const yPos = (clientY - top) / height - 0.5;

        gsap.to(imageRef.current, {
          rotationY: xPos * 20,
          rotationX: -yPos * 20,
          x: xPos * 30,
          y: yPos * 30,
          duration: 0.6,
          ease: "power2.out",
          transformPerspective: 1000
        });

        // Magnetic button effect
        if (magneticRef.current) {
          const mRect = magneticRef.current.getBoundingClientRect();
          const mX = clientX - (mRect.left + mRect.width / 2);
          const mY = clientY - (mRect.top + mRect.height / 2);
          const distance = Math.sqrt(mX * mX + mY * mY);

          if (distance < 100) {
            gsap.to(magneticRef.current, {
              x: mX * 0.4,
              y: mY * 0.4,
              duration: 0.3
            });
          } else {
            gsap.to(magneticRef.current, {
              x: 0,
              y: 0,
              duration: 0.5
            });
          }
        }
      };

      window.addEventListener('mousemove', handleMouseMove);

      // Badge Floating
      gsap.to(badgeRef.current, {
        y: -15,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative overflow-hidden py-5 md:py-32 lg:py-20 min-h-screen flex items-center">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(43,238,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(43,238,238,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black_40%,transparent_100%)]"></div>
      </div>

      {/* Glitch Effect Layers */}
      <div ref={glitchRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="glitch-layer absolute inset-0 bg-primary/5 translate-x-1"></div>
        <div className="glitch-layer absolute inset-0 bg-red-500/5 -translate-x-1"></div>
      </div>

      {/* Tech Particles Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <span 
            key={i} 
            className="tech-particle material-symbols-outlined absolute text-primary"
            style={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 24 + 16}px`
            }}
          >
            {['code', 'bug_report', 'api', 'terminal', 'database', 'verified', 'science', 'memory', 'developer_mode', 'integration_instructions'][i % 10]}
          </span>
        ))}
      </div>

      {/* Floating Profile Images */}
      {/* <div className="absolute top-24 left-8 code-float hidden lg:block">
        <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-primary/30 shadow-[0_0_30px_rgba(43,238,238,0.3)] rotate-[-8deg]">
          <img 
            src="https://i.ibb.co/bwRkXGG/IMG-20241019-173608.jpg" 
            alt="Hamad Raza" 
            className="w-full h-full object-cover"
          />
        </div>
      </div> */}
      {/* <div className="absolute bottom-40 right-16 code-float hidden lg:block">
        <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-primary/30 shadow-[0_0_30px_rgba(43,238,238,0.3)] rotate-[6deg]">
          <img 
            src="https://i.ibb.co/bwRkXGG/IMG-20241019-173608.jpg" 
            alt="Hamad Raza" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
        </div>
      </div> */}

      <div className="absolute -top-24 -left-24 h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl pointer-events-none parallax-bg"></div>
      <div className="absolute top-1/2 right-0 h-80 w-80 rounded-full bg-blue-600/10 blur-3xl pointer-events-none parallax-bg"></div>
      <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-purple-600/10 blur-3xl pointer-events-none"></div>

      <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div ref={textRef} className="flex flex-col justify-center space-y-8">
            <div className="space-y-8">
              <div className="hero-reveal inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-sm font-bold text-primary shadow-[0_0_30px_rgba(43,238,238,0.3)] qa-pulse">
                <span className="flex h-3 w-3 rounded-full bg-primary mr-3 animate-ping"></span>
                <span className="flex h-3 w-3 rounded-full bg-primary mr-3 absolute"></span>
                <span className="relative">🚀 Open for QA Opportunities</span>
              </div>
              
              <h1 className="hero-reveal text-5xl font-black tracking-tighter sm:text-6xl xl:text-8xl/none font-display leading-[1.05]">
                <span className="block text-white">Breaking</span>
                <span className="block text-primary relative">
                  Bugs<span className="typing-cursor text-white">_</span>
                </span>
                <span className="block bg-gradient-to-r from-white via-primary to-white bg-clip-text text-transparent">Not Code.</span>
              </h1>
              
              <h2 className="hero-reveal max-w-[600px] text-gray-300 md:text-xl font-body leading-relaxed">
                I'm <span className="text-primary font-black bg-primary/10 px-2 py-1 rounded">Hamad Raza</span>, 
                a Software Quality Insurance Engineer who turns chaos into <span className="line-through text-gray-500">bugs</span> <span className="text-green-400 font-bold">clean code</span>. 
                Specialized in AI-driven test automation & zero-defect releases.
              </h2>
              
              <div className="hero-reveal flex flex-wrap items-center gap-3 text-sm font-mono">
                <span className="bg-gradient-to-r from-primary/20 to-transparent border border-primary/30 px-4 py-2 rounded-full text-primary font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">school</span> MSCS
                </span>
                <span className="bg-gradient-to-r from-green-500/20 to-transparent border border-green-500/30 px-4 py-2 rounded-full text-green-400 font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">verified</span> 1.5+ Years
                </span>
                <span className="bg-gradient-to-r from-blue-500/20 to-transparent border border-blue-500/30 px-4 py-2 rounded-full text-blue-400 font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">workspace_premium</span> ISTQB
                </span>
              </div>
            </div>
            
            <div className="hero-reveal flex flex-col gap-4 min-[400px]:flex-row">
              <a 
                ref={magneticRef}
                href="#projects" 
                className="group inline-flex h-16 items-center justify-center rounded-2xl bg-primary px-10 text-base font-black text-background-dark shadow-[0_20px_50px_-15px_rgba(43,238,238,0.5)] transition-all hover:shadow-[0_25px_60px_-10px_rgba(43,238,238,0.7)] hover:scale-105 active:scale-95 relative overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                <span className="relative flex items-center gap-2">
                  <span className="material-symbols-outlined">bug_report</span>
                  View My Work
                </span>
              </a>
              <a href="#contact" className="group inline-flex h-16 items-center justify-center rounded-2xl border-2 border-primary/50 bg-primary/5 px-10 text-base font-bold text-primary backdrop-blur-sm transition-all hover:bg-primary/10 hover:border-primary hover:scale-105 active:scale-95">
                <span className="flex items-center gap-2">
                  Let's Talk
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </span>
              </a>
            </div>
          </div>

          <div className="relative mx-auto lg:mr-0 hero-reveal">
            {/* Animated Border Ring */}
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-r from-primary via-blue-500 to-primary opacity-20 blur-xl animate-pulse"></div>
            
            {/* Image Wrapper with Parallax Ref */}
            <div ref={imageRef} className="relative z-10 w-full max-w-[450px] group">
              {/* Orbiting Elements */}
              <div className="absolute -top-6 -right-6 w-16 h-16 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center animate-bounce">
                <span className="material-symbols-outlined text-primary text-2xl">verified</span>
              </div>
              <div className="absolute -bottom-4 -left-4 w-14 h-14 rounded-xl bg-green-500/20 border border-green-500/40 flex items-center justify-center code-float">
                <span className="material-symbols-outlined text-green-400 text-xl">check_circle</span>
              </div>
              
              <div className="relative rounded-3xl overflow-hidden border-2 border-primary/30 bg-gradient-to-br from-secondary-dark to-background-dark shadow-[0_0_80px_-20px_rgba(43,238,238,0.4)] p-3">
                 {/* Scanning Line Effect */}
                 <div className="absolute inset-0 z-30 overflow-hidden pointer-events-none">
                   <div className="scan-line absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
                 </div>
                 
                 {/* Corner Accents */}
                 <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary rounded-tl-xl z-20"></div>
                 <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary rounded-tr-xl z-20"></div>
                 <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary rounded-bl-xl z-20"></div>
                 <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary rounded-br-xl z-20"></div>
                 
                 <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-900/10 pointer-events-none z-20"></div>

                 <img 
                   src="https://i.ibb.co/gK2hspM/IMG-20241019-173608-removebg-preview.png" 
                   alt="Hamad Raza - QA Professional" 
                   className="aspect-square w-full object-cover rounded-2xl transition-all duration-700 group-hover:scale-105 filter saturate-110"
                 />
                 
                 {/* Status Badge */}
                 <div className="absolute bottom-6 right-6 z-30 flex items-center gap-2 bg-background-dark/90 backdrop-blur px-4 py-2 rounded-full border border-primary/30">
                   <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                   <span className="text-xs font-bold text-white">Available</span>
                 </div>
              </div>

              {/* Floating Badge */}
              <div ref={badgeRef} className="absolute -bottom-6 -left-6 z-20 rounded-2xl bg-gradient-to-br from-secondary-dark to-background-dark border border-primary/40 p-5 shadow-2xl backdrop-blur-xl flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-background-dark shadow-[0_0_30px_rgba(43,238,238,0.4)]">
                  <span className="material-symbols-outlined text-2xl">verified</span>
                </div>
                <div>
                  <p className="text-sm font-black text-white uppercase tracking-wider">Zero Bugs</p>
                  <p className="text-[10px] text-primary font-mono">QUALITY GUARANTEED</p>
                </div>
              </div>
              
              {/* Tech Stack Floating */}
              <div className="absolute -top-4 -left-8 z-20 bg-secondary-dark/90 backdrop-blur border border-border-dark rounded-xl p-3 shadow-xl code-float">
                <div className="flex gap-2">
                  <span className="w-8 h-8 bg-orange-500/20 rounded flex items-center justify-center text-orange-400 text-xs font-bold">Py</span>
                  <span className="w-8 h-8 bg-green-500/20 rounded flex items-center justify-center text-green-400 text-xs font-bold">Sel</span>
                  <span className="w-8 h-8 bg-blue-500/20 rounded flex items-center justify-center text-blue-400 text-xs font-bold">Cy</span>
                </div>
              </div>
            </div>

            {/* Decorative background circles */}
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-primary/5 rounded-full border border-primary/10 -z-10"></div>
            <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-blue-500/5 rounded-full border border-blue-500/10 -z-10"></div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500">
        <span className="text-xs uppercase tracking-widest font-mono">Scroll</span>
        <div className="w-6 h-10 rounded-full border-2 border-gray-600 flex justify-center pt-2">
          <div className="w-1 h-3 bg-primary rounded-full animate-bounce"></div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes scan {
          0% { top: -10%; }
          100% { top: 110%; }
        }
        .scan-line {
          animation: scan 3s ease-in-out infinite;
        }
        .text-gradient {
          background: linear-gradient(135deg, #fff 0%, #2beeee 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </section>
  );
};

export default Hero;
