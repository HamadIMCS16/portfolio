
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const projects = [
    {
      title: 'E-Commerce Framework',
      desc: 'Hybrid data-driven automation framework covering 200+ edge cases with 99.5% accuracy.',
      tags: ['Python', 'Selenium'],
      img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop',
      stats: { tests: '200+', coverage: '95%' },
      color: 'primary'
    },
    {
      title: 'FinTech API Suite',
      desc: 'Comprehensive API testing suite with 150+ endpoints, fully integrated into Jenkins CI/CD pipeline.',
      tags: ['Postman', 'Jenkins'],
      img: 'https://images.unsplash.com/photo-1551288049-bbbda5366391?q=80&w=2070&auto=format&fit=crop',
      stats: { tests: '150+', coverage: '98%' },
      color: 'green-400'
    },
    {
      title: 'Health App Testing',
      desc: 'Cross-platform testing for a healthcare portal ensuring 99.9% uptime and HIPAA compliance.',
      tags: ['Jira', 'TestRail'],
      img: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=2070&auto=format&fit=crop',
      stats: { tests: '300+', coverage: '99%' },
      color: 'blue-400'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 3D card tilt effect
      document.querySelectorAll('.project-card').forEach((card: any) => {
        card.addEventListener('mousemove', (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = (y - centerY) / 15;
          const rotateY = (centerX - x) / 15;

          gsap.to(card, {
            rotateX: rotateX,
            rotateY: rotateY,
            duration: 0.3,
            ease: 'power2.out',
            transformPerspective: 1000
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.5,
            ease: 'power2.out'
          });
        });
      });

      // Image reveal on scroll
      gsap.from('.project-img', {
        scale: 1.3,
        duration: 1.5,
        ease: 'power3.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 relative overflow-hidden" id="projects">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-6 text-center mb-20">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-bold">
            <span className="material-symbols-outlined text-lg">folder_special</span>
            Portfolio
          </span>
          <h2 className="text-4xl font-black tracking-tighter sm:text-6xl text-white font-display">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <p className="max-w-[700px] text-gray-400 text-lg">Deep dives into my testing frameworks and software quality solutions.</p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <div key={i} className="project-card animate-card group relative flex flex-col overflow-hidden rounded-3xl border border-border-dark bg-gradient-to-br from-secondary-dark to-background-dark transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_60px_-20px_rgba(43,238,238,0.4)]" style={{ transformStyle: 'preserve-3d' }}>
              {/* Image Container */}
              <div className="aspect-video w-full overflow-hidden bg-gray-900 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent z-10" />
                
                {/* Tags */}
                <div className="absolute top-4 right-4 z-20 flex gap-2">
                  {project.tags.map((tag, j) => (
                    <span key={j} className={`px-3 py-1.5 bg-${project.color}/20 backdrop-blur-xl rounded-full text-[10px] text-${project.color} font-black uppercase tracking-widest border border-${project.color}/30`}>
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Stats Overlay */}
                <div className="absolute bottom-4 left-4 z-20 flex gap-3">
                  <div className="bg-background-dark/90 backdrop-blur px-3 py-2 rounded-lg border border-border-dark">
                    <p className="text-[10px] text-gray-500 uppercase">Tests</p>
                    <p className="text-sm font-black text-primary">{project.stats.tests}</p>
                  </div>
                  <div className="bg-background-dark/90 backdrop-blur px-3 py-2 rounded-lg border border-border-dark">
                    <p className="text-[10px] text-gray-500 uppercase">Coverage</p>
                    <p className="text-sm font-black text-green-400">{project.stats.coverage}</p>
                  </div>
                </div>
                
                <img src={project.img} className="project-img h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-80" />
              </div>
              
              {/* Content */}
              <div className="flex flex-1 flex-col p-8" style={{ transform: 'translateZ(30px)' }}>
                <h3 className="text-2xl font-black text-white mb-3 font-display group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-6 flex-1 font-body leading-relaxed">{project.desc}</p>
                
                <a href="#" className="inline-flex items-center gap-2 text-sm font-bold text-primary group/link bg-primary/10 px-4 py-3 rounded-xl hover:bg-primary hover:text-background-dark transition-all">
                  <span className="material-symbols-outlined text-lg">visibility</span>
                  View Case Study 
                  <span className="material-symbols-outlined text-sm ml-auto transition-transform group-hover/link:translate-x-1">arrow_forward</span>
                </a>
              </div>
              
              {/* Glowing Border Effect */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(43,238,238,0.1), transparent, rgba(43,238,238,0.1))', padding: '1px' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
