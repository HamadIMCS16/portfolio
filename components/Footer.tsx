
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border-dark bg-background-dark py-12">
      <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-4 md:flex-row md:px-6">
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-2xl">terminal</span>
            <span className="text-xl font-bold font-display">Hamad Raza</span>
          </div>
          <p className="text-sm text-gray-500 font-body">
            © {new Date().getFullYear()} Hamad Raza. Built with precision for digital excellence.
          </p>
        </div>
        
        <div className="flex gap-8">
          {['LinkedIn', 'GitHub', 'Twitter', 'Dribbble'].map((social) => (
            <a key={social} className="text-gray-500 hover:text-primary transition-colors text-sm font-bold uppercase tracking-widest" href="#">
              {social}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
