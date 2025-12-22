
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const stats = [
    { label: 'Years Experience', value: '1.5+', icon: 'schedule' },
    { label: 'Projects Tested', value: '20+', icon: 'folder_open' },
    { label: 'Computer Science', value: 'MS', icon: 'school' },
    { label: 'Bug Detection', value: '99%', icon: 'bug_report' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text reveal animation
      gsap.from('.about-text', {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      });

      // Stats counter animation
      gsap.from('.stat-card', {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: '.stat-card',
          start: 'top 80%',
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 bg-gradient-to-b from-secondary-dark/30 to-transparent border-y border-border-dark relative overflow-hidden" id="about">
      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-blue-500/5 rounded-full blur-2xl" />
      
      <div className="container mx-auto max-w-6xl px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 items-start">
          <div className="flex-1 space-y-8">
            <div className="about-text space-y-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-bold">
                <span className="material-symbols-outlined text-lg">person</span>
                Get to Know Me
              </span>
              <h2 className="text-4xl font-black tracking-tighter sm:text-5xl lg:text-6xl text-white font-display">
                Crafting <span className="text-primary">Excellence</span><br/>in Software.
              </h2>
            </div>
            
            <div className="about-text w-24 h-2 bg-gradient-to-r from-primary to-blue-500 rounded-full" />
            
            <p className="about-text text-gray-300 text-lg leading-relaxed font-body">
              I am a passionate <span className="text-primary font-bold">Quality Assurance Engineer</span> with a robust academic foundation in Computer Science. My journey involves rigorous manual testing and building scalable automation frameworks that ensure software reliability.
            </p>
            <p className="about-text text-gray-400 leading-relaxed font-body">
              With over 1.5 years of hands-on experience, I thrive in fast-paced agile environments. I don't just find bugs; I <span className="text-white font-semibold">analyze root causes</span>, collaborate with developers, and advocate for user experience at every stage of the SDLC.
            </p>
            
            {/* Philosophy Badge */}
            <div className="about-text flex items-center gap-4 p-4 bg-secondary-dark/50 rounded-xl border border-border-dark">
              <span className="material-symbols-outlined text-4xl text-primary">lightbulb</span>
              <div>
                <p className="text-white font-bold">My Philosophy</p>
                <p className="text-sm text-gray-400">"Quality is not an act, it's a habit" — Aristotle</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 w-full lg:w-auto min-w-[360px]">
            {stats.map((stat, i) => (
              <div key={i} className="stat-card animate-card group bg-gradient-to-br from-secondary-dark to-background-dark backdrop-blur p-6 rounded-2xl border border-border-dark text-center transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 hover:shadow-[0_10px_40px_-15px_rgba(43,238,238,0.3)]">
                <span className="material-symbols-outlined text-2xl text-primary/50 mb-2 block group-hover:text-primary transition-colors">{stat.icon}</span>
                <span className="text-4xl font-black text-primary block mb-2 font-display tracking-tight">{stat.value}</span>
                <span className="text-xs uppercase tracking-widest text-gray-500 font-bold">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
