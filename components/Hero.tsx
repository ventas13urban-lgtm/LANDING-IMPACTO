import React, { useLayoutEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from './SplitText';

gsap.registerPlugin(ScrollTrigger);

const HERO_BG = "https://raw.githubusercontent.com/ventas13urban-lgtm/impacto-landing-assets/main/20250824_1801_Elegant%20Retro%20Communication_simple_compose_01k3f8b74ferfrxw2ezaff19fg.png";

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const revealContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Estado inicial: capa de imagen oculta desde abajo
      gsap.set(revealContainerRef.current, { 
        clipPath: "inset(100% 0% 0% 0%)",
        WebkitClipPath: "inset(100% 0% 0% 0%)"
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          start: "top top", 
          end: "+=120%", // Reducido ligeramente para mayor dinamismo
          scrub: 0.5, // AJUSTE CLAVE: Reducido de 2 a 0.5 para respuesta rápida
          anticipatePin: 1,
        }
      });

      // Revelado del fondo con imagen (clipPath scrub)
      tl.to(revealContainerRef.current, {
        clipPath: "inset(0% 0% 0% 0%)",
        WebkitClipPath: "inset(0% 0% 0% 0%)", 
        duration: 1,
        ease: "none" 
      });

      // Animación sutil de escala para la imagen de fondo
      tl.fromTo(".hero-bg-img", 
        { scale: 1.15 }, 
        { scale: 1, duration: 1, ease: "power1.out" }, 
        0
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const HeroContent = ({ isOverlay }: { isOverlay: boolean }) => (
    <div className="absolute inset-0 w-full h-full flex flex-col justify-center px-6 md:px-12 lg:px-24">
      
      {/* Metadata - Top Left */}
      <div className="absolute top-12 left-6 md:left-12 lg:left-24 flex items-center gap-2">
        <span className={`w-1.5 h-1.5 rounded-full ${isOverlay ? 'bg-white' : 'bg-impacto-blue'}`}></span>
        <span className={`text-[10px] font-mono uppercase tracking-[0.4em] antialiased font-medium ${isOverlay ? 'text-white' : 'text-gray-500'}`}>
          EST. 2024 &mdash; CDMX / GLOBAL
        </span>
      </div>

      {/* Main Copy */}
      <div className="relative z-10 flex flex-col items-start max-w-7xl">
        <h1 className={`font-sans font-black text-[15vw] md:text-[10vw] leading-[0.8] tracking-[-0.05em] antialiased select-none ${isOverlay ? 'text-white' : 'text-black'}`}>
          <div className="mb-2">
            <SplitText charClassName="char" wordClassName="inline-block">Marketing digital</SplitText>
          </div>
          <div className="flex items-baseline gap-4">
            <SplitText charClassName="char" wordClassName="inline-block">para</SplitText>
            <span className="font-mono font-light italic text-[13vw] md:text-[9vw] lowercase tracking-normal">
              <SplitText charClassName="char" wordClassName="inline-block">pymes.</SplitText>
            </span>
          </div>
        </h1>

        {/* Button - Solo visible en la capa superior para evitar duplicidad de sombras */}
        <div className={`mt-12 transition-opacity duration-300 ${isOverlay ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
          <button 
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="
              flex items-center gap-6 px-10 py-5 bg-white text-black 
              rounded-none shadow-2xl hover:scale-[1.02] active:scale-[0.98] 
              transition-all duration-300 ease-out group antialiased
            "
          >
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em]">
              Agendar Asesoría
            </span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-white">
      {/* Capa Base (Blanca) */}
      <div className="absolute inset-0 z-0">
        <HeroContent isOverlay={false} />
      </div>

      {/* Capa de Revelado (Imagen Retro Elegante) */}
      <div 
        ref={revealContainerRef}
        className="absolute inset-0 z-10 bg-black overflow-hidden will-change-[clip-path]" // OPTIMIZACIÓN: will-change
        style={{ 
          clipPath: 'inset(100% 0% 0% 0%)',
          WebkitClipPath: 'inset(100% 0% 0% 0%)' 
        }} 
      >
        {/* Imagen de Fondo Principal */}
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
           <img 
            src={HERO_BG} 
            alt="Retro Communication Background" 
            className="hero-bg-img w-full h-full object-cover brightness-[0.4] contrast-125 will-change-transform" // OPTIMIZACIÓN
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>
        </div>
        
        <HeroContent isOverlay={true} />
      </div>
    </section>
  );
};