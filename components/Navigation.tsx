import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out border-b ${
          isScrolled ? 'bg-impacto-light/90 backdrop-blur-md border-gray-200 py-3' : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="z-50 text-2xl font-sans font-black tracking-tighter text-impacto-dark">
            IMPACTO<span className="text-impacto-blue">.</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#projects" className="text-sm font-mono text-impacto-dark hover:text-impacto-blue transition-colors">
              Proyectos
            </a>
            <button 
              onClick={scrollToContact}
              className="bg-impacto-dark text-white px-5 py-2 text-sm font-sans font-semibold hover:bg-impacto-blue transition-colors duration-300"
            >
              Agendar Asesoría
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden z-50 text-impacto-dark"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Fullscreen Menu */}
        <div className={`fixed inset-0 bg-impacto-light z-40 flex flex-col items-center justify-center space-y-8 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
          <a 
            href="#projects" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-4xl font-sans font-bold text-impacto-dark hover:text-impacto-blue"
          >
            Proyectos
          </a>
          <button 
            onClick={scrollToContact}
            className="text-4xl font-sans font-bold text-impacto-blue flex items-center gap-2"
          >
            Agendar <ArrowUpRight className="w-8 h-8" />
          </button>
        </div>
      </nav>
    </>
  );
};