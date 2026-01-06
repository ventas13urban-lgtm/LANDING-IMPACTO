import React, { useLayoutEffect, useRef } from 'react';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';
import gsap from 'gsap';
import { Project } from '../types';

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
  onNext: () => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onClose, onNext }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Manejo de la animación de entrada y salida
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" }
      });

      // 1. Entrada: Swipe Up del contenedor principal
      tl.set(containerRef.current, {
        clipPath: "inset(100% 0% 0% 0%)",
        visibility: "visible"
      });
      
      tl.to(containerRef.current, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.8,
        ease: "expo.out"
      });

      // 2. Elementos de texto: Stagger fade up
      tl.from(".detail-anim", {
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        clearProps: "transform" // Limpiar para no afectar el scroll nativo
      }, "-=0.4");

      // 3. Imágenes de la galería: Stagger scale/fade
      tl.from(".gallery-img", {
        y: 100,
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        stagger: 0.1,
        clearProps: "all"
      }, "-=0.4");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleClose = () => {
    // Animación de salida manual antes de desmontar
    const tl = gsap.timeline({
      onComplete: onClose
    });

    tl.to(contentRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.3
    });

    tl.to(containerRef.current, {
      clipPath: "inset(0% 0% 100% 0%)", // Swipe down exit
      duration: 0.5,
      ease: "expo.in"
    }, "-=0.1");
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] w-full h-full bg-[#0a0a0a] text-white overflow-y-auto no-scrollbar invisible font-mono font-light"
      style={{ willChange: 'clip-path' }}
    >
      {/* Sticky Close Button */}
      <div className="fixed top-6 right-6 z-[110] mix-blend-difference">
        <button 
          onClick={handleClose}
          className="group flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition-colors duration-300"
        >
          <span className="text-[10px] font-mono font-light uppercase tracking-widest hidden md:inline-block">Cerrar</span>
          <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
        </button>
      </div>

      <div ref={contentRef} className="relative min-h-screen pb-24">
        
        {/* Header Hero */}
        <header className="pt-32 pb-16 px-6 md:px-12 lg:px-24 border-b border-white/10">
          <div className="max-w-7xl mx-auto">
             {/* Label Modificado: Blanco, Sin ID, CLIENTE IMPACTO */}
             <span className="detail-anim block text-white font-mono font-light text-xs md:text-sm tracking-[0.3em] uppercase mb-6 opacity-70">
                CLIENTE IMPACTO
             </span>
             
             {/* Título: Modificado a Mono Light */}
             <h1 className="detail-anim font-mono font-light text-4xl md:text-7xl leading-[1.1] tracking-tighter uppercase mb-12 max-w-5xl">
               {project.title}
             </h1>
             
             <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start">
               <div className="detail-anim flex-1">
                 {/* Descripción: Modificado a Mono Light */}
                 <p className="font-mono font-light text-lg md:text-xl text-gray-300 leading-relaxed">
                   {project.fullDescription || project.description}
                 </p>
               </div>
               
               {/* Metadata: Modificado a Mono Light */}
               <div className="detail-anim w-full md:w-auto min-w-[200px] space-y-6 border-l border-white/20 pl-6">
                 <div>
                   <span className="block text-[10px] text-gray-500 uppercase tracking-widest mb-1 font-mono font-light">Servicio</span>
                   <span className="text-sm font-mono font-light text-white">{project.service || "Estrategia Digital"}</span>
                 </div>
                 <div>
                   <span className="block text-[10px] text-gray-500 uppercase tracking-widest mb-1 font-mono font-light">Año</span>
                   <span className="text-sm font-mono font-light text-white">{project.year || "2024"}</span>
                 </div>
                 <div>
                   <span className="block text-[10px] text-gray-500 uppercase tracking-widest mb-1 font-mono font-light">Cliente</span>
                   <span className="text-sm font-mono font-light text-white">{project.title}</span>
                 </div>
               </div>
             </div>
          </div>
        </header>

        {/* Gallery Section */}
        <section className="px-4 md:px-8 mt-4">
          <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 auto-rows-[400px] md:auto-rows-[600px]">
             
             {/* Feature Image */}
             <div className="gallery-img col-span-1 md:col-span-2 lg:col-span-8 row-span-1 relative overflow-hidden group">
               <img src={project.image} alt="Main" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
               <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
             </div>

             {/* Secondary Image */}
             <div className="gallery-img col-span-1 md:col-span-1 lg:col-span-4 row-span-1 relative overflow-hidden group">
                <img src={project.gallery?.[0] || project.image} alt="Detail 1" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
             </div>

             {/* Third Image */}
             <div className="gallery-img col-span-1 md:col-span-1 lg:col-span-4 row-span-1 relative overflow-hidden group">
                <img src={project.gallery?.[1] || project.image} alt="Detail 2" className="w-full h-full object-cover" />
             </div>

              {/* Fourth Image */}
             <div className="gallery-img col-span-1 md:col-span-2 lg:col-span-8 row-span-1 relative overflow-hidden group">
                <img src={project.gallery?.[2] || project.image} alt="Detail 3" className="w-full h-full object-cover brightness-75 group-hover:brightness-100 transition-all" />
             </div>

          </div>
        </section>

        {/* Footer Navigation: Volver / Siguiente Proyecto */}
        <div className="mt-24 pb-24 border-t border-white/10 pt-12">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex flex-col md:flex-row justify-between items-start md:items-center gap-12 md:gap-8">
            
            {/* Botón Volver (Izquierda) */}
            <button 
              onClick={handleClose} 
              className="detail-anim group flex items-center gap-3 text-sm font-mono font-light uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
            >
               <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
               Volver
            </button>

            {/* Botón Siguiente (Derecha) */}
            <button 
              onClick={onNext} 
              className="detail-anim group w-full md:w-auto flex items-center justify-between md:justify-start gap-4 text-2xl md:text-4xl font-mono font-light uppercase text-white hover:text-gray-400 transition-colors"
            >
              <span>Siguiente Proyecto</span>
              <ArrowRight className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-2 transition-transform" />
            </button>

          </div>
        </div>

      </div>
    </div>
  );
};