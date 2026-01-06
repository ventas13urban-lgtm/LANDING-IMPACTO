import React, { useLayoutEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ContactCTA } from './ContactCTA';
import { Project } from '../types';
import { projects } from '../data';

gsap.registerPlugin(ScrollTrigger);

const GITHUB_BASE = "https://raw.githubusercontent.com/ventas13urban-lgtm/impacto-landing-assets/main";
const SEAL_URL = `${GITHUB_BASE}/SELLO%20BLANCO.png`;

interface PortfolioProps {
  onProjectSelect: (project: Project) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onProjectSelect }) => {
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
          scrub: 0.3, 
          end: () => `+=${track.scrollWidth}`, 
          invalidateOnRefresh: true,
          anticipatePin: 1, 
          fastScrollEnd: true, 
        }
      });

      // Seal Rotation
      gsap.to('.scroll-seal', {
        rotation: 360,
        ease: "none",
        scrollTrigger: {
          trigger: componentRef.current,
          start: "top top",
          end: () => `+=${track.scrollWidth}`,
          scrub: 0.3,
        }
      });
      
      // FADE OUT SEAL ON CONTACT SLIDE
      // This ensures the logo doesn't overlap the new clean form
      gsap.to('.scroll-seal', {
         opacity: 0,
         scrollTrigger: {
            trigger: "#contact-slide",
            containerAnimation: scrollTween,
            start: "left 80%",
            end: "left 20%",
            scrub: true
         }
      });

    }, componentRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={componentRef} id="projects" className="bg-black text-white h-screen overflow-hidden relative z-10">
      
      {/* GLOBAL ROTATING SEAL */}
      <div className="absolute top-6 left-6 md:top-12 md:left-12 z-50 w-32 h-32 md:w-64 md:h-64 pointer-events-none opacity-80 select-none">
        <img 
          src={SEAL_URL} 
          alt="Impacto Seal" 
          className="scroll-seal w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(255,255,255,0.1)] will-change-transform"
        />
      </div>

      <div 
        ref={trackRef} 
        className="flex flex-nowrap h-full will-change-transform gap-0 m-0 p-0 border-none items-stretch w-max"
      >
        {projects.map((project) => (
          <div 
            key={project.id} 
            onClick={() => onProjectSelect(project)}
            className="relative h-full flex-shrink-0 w-screen md:w-[50vw] overflow-hidden m-0 p-0 border-none bg-black group cursor-pointer"
          >
            {/* Background Image - Subtle Hover Scale & Brightness */}
            <div className="absolute inset-0 overflow-hidden">
                <img 
                src={project.image} 
                alt={project.title}
                className={`project-image absolute inset-0 w-full h-full object-cover scale-[1.01] brightness-[0.4] will-change-transform transition-all duration-700 ease-out group-hover:scale-[1.03] group-hover:brightness-[0.5] ${project.imageAlignment || 'object-center'}`}
                />
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 z-10 p-8 md:p-12 flex flex-col justify-end pointer-events-none">
              <div className="flex flex-col items-end text-right">
                <h3 className="font-sans font-black text-4xl md:text-6xl lg:text-7xl text-white tracking-tighter leading-[0.8] mb-2 drop-shadow-2xl uppercase transition-transform duration-500 group-hover:-translate-y-2">
                  {project.title}
                </h3>
                
                <div className="flex items-center gap-3">
                   {/* Subtle Arrow Indicator on Hover */}
                   <div className="opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-white/80">
                      <ArrowUpRight className="w-4 h-4" />
                   </div>
                   <p className="font-mono text-[10px] md:text-xs text-gray-400 tracking-widest uppercase opacity-80 font-bold group-hover:text-white transition-colors duration-300">
                     {project.description}
                   </p>
                </div>

              </div>
            </div>
          </div>
        ))}

        {/* Contact Section - NOW FULL SCREEN (w-screen) */}
        <div id="contact-slide" className="relative h-full flex-shrink-0 w-screen m-0 p-0 overflow-hidden bg-black">
          <ContactCTA />
        </div>
      </div>
    </section>
  );
};