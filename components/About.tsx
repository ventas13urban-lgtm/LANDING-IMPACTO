import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BG_URL = "https://raw.githubusercontent.com/ventas13urban-lgtm/impacto-landing-assets/main/Abstract%20Velodrome%20Speed.png";

export const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Seleccionamos todas las palabras (spans)
      const allWords = textRef.current?.querySelectorAll('.typewriter-word');
      
      // Estado inicial: Totalmente invisibles
      gsap.set(allWords, { opacity: 0, display: "none" }); 

      if (allWords && allWords.length > 0) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            pin: true,
            start: "top top",
            end: "+=200%", // Duración del pin para leer
            scrub: 0.5,
          }
        });

        // Animación estilo Máquina de Escribir pura (aparece de golpe, secuencial)
        tl.to(allWords, { 
          display: "inline-block",
          opacity: 1, 
          stagger: 0.08, // Velocidad ajustada
          duration: 0.01, // Aparición instantánea por palabra
          ease: "none" 
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Helper para renderizar palabras
  const renderWords = (text: string) => {
    return text.split(" ").map((word, i) => (
      <span key={i} className="typewriter-word mr-3">
        {word}
      </span>
    ));
  };

  return (
    <>
      {/* 
        FONDO FIJO (Pinned Background) 
        Este elemento permanece estático (fixed) en el viewport con z-index bajo (0).
        Las secciones Hero y Portfolio (z-30) se deslizan sobre él, creando el efecto de "ventana".
      */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
        <img 
          src={BG_URL} 
          alt="Abstract Velodrome" 
          className="w-full h-full object-cover grayscale opacity-100" // Opacidad alta para ver la bici clara
        />
        {/* Overlay ligero para contraste de texto */}
        <div className="absolute inset-0 bg-black/50"></div> 
      </div>

      {/* 
        SECCIÓN DE CONTENIDO (Scrollable) 
        Esta sección es transparente y contiene solo el texto.
        Usa z-10 para estar por encima de la imagen fija.
      */}
      <section ref={containerRef} className="relative w-full h-screen z-10 flex items-center justify-center bg-transparent">
        
        {/* Text Container */}
        <div className="max-w-5xl px-8 md:px-16 w-full">
          <div ref={textRef} className="flex flex-col gap-8 font-mono font-light text-2xl md:text-3xl lg:text-4xl leading-relaxed text-white drop-shadow-lg">
            
            {/* Línea 1 */}
            <div className="flex flex-wrap">
              {renderWords("Somos una agencia de marketing que genera estrategias para vender más.")}
            </div>

            {/* Línea 2 */}
            <div className="flex flex-wrap text-gray-200">
              {renderWords("No buscamos visitas vacías,")}
            </div>

            {/* Línea 3 - Estilo Impactante */}
            <div className="flex flex-wrap text-white font-sans italic font-bold tracking-tighter">
              {renderWords("te buscamos clientes.")}
            </div>

          </div>
        </div>

      </section>
    </>
  );
};