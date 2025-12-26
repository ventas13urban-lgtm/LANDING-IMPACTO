import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EpicManifesto } from './EpicManifesto';
import { ContactCTA } from './ContactCTA';

gsap.registerPlugin(ScrollTrigger);

const GITHUB_BASE = "https://raw.githubusercontent.com/ventas13urban-lgtm/impacto-landing-assets/main";
const SEAL_URL = `${GITHUB_BASE}/SELLO%20BLANCO.png`;

const projects = [
  { id: '01', title: 'Grupo Tangassi', description: 'ESTRATEGIA DIGITAL Y CAPTACIÓN.', image: `${GITHUB_BASE}/thumb%20tangassi.jpg` },
  { id: '02', title: 'Orno Taller', description: 'CAFÉ, CERÁMICA Y EXPERIENCIA.', image: `${GITHUB_BASE}/thumb%20orno.jpg` },
  { id: '03', title: 'Vetra Bikes', description: 'LANZAMIENTO E-COMMERCE.', image: `${GITHUB_BASE}/thumb%20vetra.jpg` },
  { id: '04', title: 'Silvestre', description: 'IDENTIDAD VISUAL Y COMUNIDAD.', image: `${GITHUB_BASE}/thumb%20silvestre.jpg` },
  { id: '05', title: 'BAMSA', description: 'SISTEMAS DE AGUA INDUSTRIALES.', image: `${GITHUB_BASE}/20250906_1809_Hydraulic%20Submersion%20Macro_simple_compose_01k4gr1k3seg6shs4w1pfmmvwx.png` },
];

export const Portfolio: React.FC = () => {
  const componentRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      // Master horizontal scroll
      const scrollTween = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: componentRef.current,
          pin: true,
          scrub: 1, 
          end: () => `+=${track.scrollWidth}`, 
          invalidateOnRefresh: true,
        }
      });

      // Manifesto text reveal
      const chars = gsap.utils.toArray('.manifesto-char');
      gsap.to(chars, {
        opacity: 1,
        color: "#FFFFFF",
        stagger: 0.05,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#manifesto-slide",
          containerAnimation: scrollTween,
          start: "left center",
          end: "center center",
          scrub: 1, 
        }
      });

      // Global Seal Rotation - Rotates 360 over the entire track distance
      gsap.to('.scroll-seal', {
        rotation: 360,
        ease: "none",
        scrollTrigger: {
          trigger: componentRef.current,
          start: "top top",
          end: () => `+=${track.scrollWidth}`,
          scrub: 1,
        }
      });

    }, componentRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={componentRef} id="projects" className="bg-black text-white h-screen overflow-hidden relative z-10">
      
      {/* GLOBAL ROTATING SEAL - Fixed top-left for the entire rail duration */}
      <div className="absolute top-6 left-6 md:top-12 md:left-12 z-50 w-32 h-32 md:w-64 md:h-64 pointer-events-none opacity-80 select-none">
        <img 
          src={SEAL_URL} 
          alt="Impacto Seal" 
          className="scroll-seal w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]"
        />
      </div>

      <div 
        ref={trackRef} 
        className="flex flex-nowrap h-full will-change-transform gap-0 m-0 p-0 border-none items-stretch w-max"
      >
        {projects.map((project) => (
          <div key={project.id} className="relative h-full flex-shrink-0 w-screen md:w-[50vw] overflow-hidden m-0 p-0 border-none bg-black">
            {/* Background Image */}
            <img 
               src={project.image} 
               alt={project.title}
               className="project-image absolute inset-0 w-full h-full object-cover scale-[1.01] brightness-[0.4] will-change-transform"
            />

            {/* Content Overlay - Aligned to the RIGHT */}
            <div className="absolute inset-0 z-10 p-8 md:p-12 flex flex-col justify-end pointer-events-none">
              <div className="flex flex-col items-end text-right">
                <h3 className="font-sans font-black text-4xl md:text-6xl lg:text-7xl text-white tracking-tighter leading-[0.8] mb-2 drop-shadow-2xl uppercase">
                  {project.title}
                </h3>
                <p className="font-mono text-[10px] md:text-xs text-gray-400 tracking-widest uppercase opacity-80 font-bold">
                  {project.description}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Manifesto Section */}
        <div id="manifesto-slide" className="relative h-full flex-shrink-0 w-screen md:w-[50vw] m-0 p-0 overflow-hidden bg-black">
          <EpicManifesto />
        </div>

        {/* Contact Section */}
        <div id="contact-slide" className="relative h-full flex-shrink-0 w-screen md:w-[50vw] m-0 p-0 overflow-hidden bg-black">
          <ContactCTA />
        </div>
      </div>
    </section>
  );
};