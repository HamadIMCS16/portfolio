
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Input focus animation
      document.querySelectorAll('.form-input').forEach((input: any) => {
        input.addEventListener('focus', () => {
          gsap.to(input, {
            scale: 1.02,
            borderColor: '#2beeee',
            duration: 0.3
          });
        });
        input.addEventListener('blur', () => {
          gsap.to(input, {
            scale: 1,
            borderColor: '#283939',
            duration: 0.3
          });
        });
      });

      // Contact info hover
      document.querySelectorAll('.contact-item').forEach((item: any) => {
        item.addEventListener('mouseenter', () => {
          gsap.to(item.querySelector('.contact-icon'), {
            scale: 1.2,
            rotation: 10,
            duration: 0.3
          });
        });
        item.addEventListener('mouseleave', () => {
          gsap.to(item.querySelector('.contact-icon'), {
            scale: 1,
            rotation: 0,
            duration: 0.3
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 bg-gradient-to-t from-black via-background-dark to-background-dark border-t border-border-dark relative overflow-hidden" id="contact">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container mx-auto max-w-6xl px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-bold mb-6">
            <span className="material-symbols-outlined text-lg">mail</span>
            Get In Touch
          </span>
          <h2 className="text-4xl font-black tracking-tighter sm:text-6xl text-white font-display">
            Let's Build <span className="text-primary">Quality</span> Together
          </h2>
        </div>
        
        <div className="animate-card rounded-[2rem] border border-border-dark bg-gradient-to-br from-secondary-dark/80 to-background-dark p-8 md:p-16 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          {/* Corner Decorations */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-primary/10 to-transparent" />
          
          <div className="grid gap-16 lg:grid-cols-2 relative z-10">
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-3xl font-black text-white font-display">Have a project in mind?</h3>
                <p className="text-gray-400 text-lg font-body leading-relaxed">
                  Looking for a QA Engineer to ensure your software is bulletproof? I'm always open to discussing new opportunities and challenges.
                </p>
              </div>
              
              <div className="space-y-4 pt-4">
                {[
                  { icon: 'mail', value: 'hamad.raza@example.com', label: 'Email Me', color: 'primary' },
                  { icon: 'call', value: '+1 (555) 123-4567', label: 'Call Me', color: 'green-400' },
                  { icon: 'location_on', value: 'New York, NY (Open to Remote)', label: 'Location', color: 'blue-400' }
                ].map((item, i) => (
                  <div key={i} className="contact-item flex items-center gap-5 group p-4 rounded-2xl border border-transparent hover:border-border-dark hover:bg-secondary-dark/50 transition-all cursor-pointer">
                    <div className={`contact-icon flex h-14 w-14 items-center justify-center rounded-2xl bg-${item.color}/10 border border-${item.color}/30 text-${item.color}`}>
                      <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">{item.label}</p>
                      <p className="text-white font-medium text-lg">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Social Links */}
              <div className="pt-4">
                <p className="text-sm text-gray-500 uppercase tracking-widest font-bold mb-4">Connect with me</p>
                <div className="flex gap-3">
                  {[
                    { icon: 'M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.164 22 16.42 22 12c0-5.523-4.477-10-10-10z', name: 'GitHub' },
                    { icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z', name: 'LinkedIn' },
                  ].map((social, i) => (
                    <a key={i} href="#" className="flex items-center justify-center w-12 h-12 rounded-xl bg-secondary-dark border border-border-dark text-gray-400 hover:text-primary hover:border-primary/50 transition-all hover:scale-110">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d={social.icon} />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            
            <form ref={formRef} className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest" htmlFor="name">Full Name</label>
                  <input className="form-input flex h-14 w-full rounded-2xl border-2 border-border-dark bg-background-dark/50 px-5 py-2 text-sm text-white placeholder:text-gray-600 focus:ring-0 focus:border-primary outline-none transition-all" id="name" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest" htmlFor="email">Email Address</label>
                  <input className="form-input flex h-14 w-full rounded-2xl border-2 border-border-dark bg-background-dark/50 px-5 py-2 text-sm text-white placeholder:text-gray-600 focus:ring-0 focus:border-primary outline-none transition-all" id="email" placeholder="john@example.com" type="email" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest" htmlFor="subject">Subject</label>
                <input className="form-input flex h-14 w-full rounded-2xl border-2 border-border-dark bg-background-dark/50 px-5 py-2 text-sm text-white placeholder:text-gray-600 focus:ring-0 focus:border-primary outline-none transition-all" id="subject" placeholder="Project Inquiry" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest" htmlFor="message">Message</label>
                <textarea className="form-input flex min-h-[160px] w-full rounded-2xl border-2 border-border-dark bg-background-dark/50 px-5 py-4 text-sm text-white placeholder:text-gray-600 focus:ring-0 focus:border-primary outline-none transition-all resize-none" id="message" placeholder="Tell me about your project..."></textarea>
              </div>
              <button className="group inline-flex h-16 w-full items-center justify-center rounded-2xl bg-primary px-8 text-base font-black text-background-dark shadow-[0_20px_40px_-15px_rgba(43,238,238,0.4)] transition-all hover:shadow-[0_25px_50px_-10px_rgba(43,238,238,0.6)] hover:scale-[1.02] active:scale-95 relative overflow-hidden" type="submit">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                <span className="relative flex items-center gap-2">
                  <span className="material-symbols-outlined">send</span>
                  Send Message
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
