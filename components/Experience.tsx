
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  
  const experiences = [
    {
      role: 'QA Engineer',
      company: 'Zetsol Technologies',
      period: 'Jan 2025 - Present',
      desc: 'Led the automation initiative, reducing regression testing time by 40% using Selenium and Python. Managed full bug lifecycles in Jira across multiple production cycles.',
      achievements: ['40% faster testing', 'Automation lead', '200+ test cases'],
      icon: 'rocket_launch'
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate timeline line drawing
      gsap.from('.timeline-line', {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        }
      });

      // Animate experience cards
      gsap.from('.exp-card', {
        opacity: 0,
        x: (i: number) => i % 2 === 0 ? -100 : 100,
        duration: 1,
        stagger: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 70%',
        }
      });

      // Pulse animation on dots
      gsap.to('.timeline-dot', {
        boxShadow: '0 0 30px rgba(43, 238, 238, 0.8)',
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        stagger: 0.5
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 bg-gradient-to-b from-transparent via-secondary-dark/20 to-transparent border-y border-border-dark relative" id="experience">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <div className="text-center mb-20">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-bold mb-6">
            <span className="material-symbols-outlined text-lg">work</span>
            Career Journey
          </span>
          <h2 className="text-4xl font-black tracking-tighter sm:text-6xl text-white font-display">
            Work <span className="text-primary">Experience</span>
          </h2>
        </div>
        
        <div ref={timelineRef} className="relative">
          {/* Timeline Line */}
          <div className="timeline-line absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-blue-500 to-purple-500 rounded-full sm:left-1/2 sm:-translate-x-1/2" />
          
          <div className="space-y-16">
            {experiences.map((exp, i) => (
              <div key={i} className={`exp-card relative flex flex-col sm:flex-row items-start sm:items-center ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                <div className={`sm:w-[45%] ${i % 2 === 0 ? 'sm:text-right sm:pr-12' : 'sm:text-left sm:pl-12'} pl-16 sm:pl-0 w-full`}>
                  <div className="animate-card p-8 rounded-3xl border border-border-dark bg-gradient-to-br from-secondary-dark to-background-dark transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_50px_-15px_rgba(43,238,238,0.3)] group">
                    {/* Icon */}
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-background-dark transition-all ${i % 2 === 0 ? 'sm:ml-auto' : ''}`}>
                      <span className="material-symbols-outlined">{exp.icon}</span>
                    </div>
                    
                    <h3 className="text-2xl font-black text-white font-display">{exp.role}</h3>
                    <p className="text-primary font-bold text-lg">{exp.company}</p>
                    <p className="text-sm text-gray-500 mb-4 font-mono flex items-center gap-2 ${i % 2 === 0 ? 'sm:justify-end' : ''}">
                      <span className="material-symbols-outlined text-sm">calendar_month</span>
                      {exp.period}
                    </p>
                    <p className="text-gray-400 text-sm font-body leading-relaxed mb-4">{exp.desc}</p>
                    
                    {/* Achievement Tags */}
                    <div className={`flex flex-wrap gap-2 ${i % 2 === 0 ? 'sm:justify-end' : ''}`}>
                      {exp.achievements.map((ach, j) => (
                        <span key={j} className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs text-primary font-bold">
                          {ach}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Timeline Dot */}
                <div className="timeline-dot absolute left-6 sm:left-1/2 w-6 h-6 rounded-full bg-background-dark border-4 border-primary -translate-x-2.5 sm:-translate-x-3 z-10 shadow-[0_0_20px_rgba(43,238,238,0.5)]" />
                
                <div className="sm:w-[45%]"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
