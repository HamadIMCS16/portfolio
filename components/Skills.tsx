
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const skills = [
    {
      title: 'Manual Testing',
      desc: 'Test Planning, Case Creation, Jira, Bug Tracking, Regression Testing.',
      icon: 'checklist',
      color: 'primary',
      level: 95
    },
    {
      title: 'Automation',
      desc: 'Selenium, Cypress, Python, Java, TestNG/JUnit frameworks.',
      icon: 'smart_toy',
      color: 'green-400',
      level: 90
    },
    {
      title: 'API Testing',
      desc: 'Postman, REST Assured, Swagger, JSON validation, Endpoints.',
      icon: 'api',
      color: 'blue-400',
      level: 88
    },
    {
      title: 'CI/CD & Tools',
      desc: 'Jenkins, Git/GitHub, Docker, SQL, Agile/Scrum Methodologies.',
      icon: 'deployed_code',
      color: 'purple-400',
      level: 85
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate skill bars on scroll
      gsap.from('.skill-bar', {
        width: 0,
        duration: 1.5,
        ease: 'power3.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      });

      // Counter animation for skill levels
      document.querySelectorAll('.skill-counter').forEach((counter: any) => {
        gsap.from(counter, {
          textContent: 0,
          duration: 2,
          ease: 'power2.out',
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: counter,
            start: 'top 80%',
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 relative overflow-hidden" id="skills">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(43,238,238,0.05),transparent_50%)]" />
      
      <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-6 text-center mb-20">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-bold">
            <span className="material-symbols-outlined text-lg">construction</span>
            Technical Arsenal
          </span>
          <h2 className="text-4xl font-black tracking-tighter sm:text-6xl text-white font-display">
            My <span className="text-primary">QA Toolkit</span>
          </h2>
          <p className="max-w-[700px] text-gray-400 text-lg">Battle-tested tools and frameworks for crushing bugs and delivering quality.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, i) => (
            <div key={i} className="animate-card group relative overflow-hidden rounded-2xl border border-border-dark bg-gradient-to-br from-secondary-dark to-background-dark p-8 transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_40px_-10px_rgba(43,238,238,0.3)] hover:-translate-y-2">
              {/* Glow Effect */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="mb-6 flex items-center justify-between">
                <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-${skill.color}/10 text-${skill.color} group-hover:bg-${skill.color} group-hover:text-background-dark transition-all duration-300 border border-${skill.color}/30`}>
                  <span className="material-symbols-outlined text-3xl">{skill.icon}</span>
                </div>
                <span className="skill-counter text-3xl font-black text-primary font-mono">{skill.level}</span>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2 font-display">{skill.title}</h3>
              <p className="text-sm text-gray-400 font-body leading-relaxed mb-4">{skill.desc}</p>
              
              {/* Skill Bar */}
              <div className="h-1.5 bg-border-dark rounded-full overflow-hidden">
                <div className={`skill-bar h-full bg-gradient-to-r from-${skill.color} to-${skill.color}/50 rounded-full`} style={{ width: `${skill.level}%` }} />
              </div>
              
              {/* Bottom Accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
          ))}
        </div>
        
        {/* Tech Stack Badges */}
        <div className="mt-16 flex flex-wrap justify-center gap-3">
          {['Python', 'Selenium', 'Cypress', 'Postman', 'Jenkins', 'Git', 'Docker', 'SQL', 'Jira', 'TestRail'].map((tech, i) => (
            <span key={i} className="animate-card px-4 py-2 bg-secondary-dark border border-border-dark rounded-lg text-sm text-gray-300 font-mono hover:border-primary/50 hover:text-primary transition-all cursor-default">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
