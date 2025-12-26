import React from 'react';
import { ArrowRight } from 'lucide-react';

const TEXTURE_URL = "https://raw.githubusercontent.com/ventas13urban-lgtm/impacto-landing-assets/main/fondo%20gris.jpg";

export const manifestItems = [
  "La mejor manera",
  "de empezar es con",
  "una asesoría de",
  "30 minutos.",
];

export const EpicManifesto: React.FC = () => {
  return (
    <div className="relative w-full h-full bg-black overflow-hidden flex items-center justify-center m-0 p-0">
      
      {/* Background Texture Layer */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <img 
          src={TEXTURE_URL} 
          alt="Texture Background" 
          className="w-full h-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-black/80"></div>
      </div>

      {/* Content Container - Aligned right on mobile, left/center on desktop */}
      <div className="w-full px-8 md:px-12 relative z-10">
        <div className="flex flex-col items-end md:items-start justify-center text-right md:text-left">
          {manifestItems.map((line, index) => (
            <div key={index} className="mb-2 w-full flex items-center justify-end md:justify-start">
              <h2 className="font-mono font-light text-2xl md:text-4xl lg:text-5xl leading-tight text-white tracking-tighter flex items-center gap-4">
                <span className="flex flex-wrap justify-end md:justify-start">
                  {line.split('').map((char, i) => (
                    <span 
                      key={i} 
                      className="manifesto-char inline-block opacity-20"
                      style={{ color: '#333' }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                </span>
                
                {/* Subtle Arrow on the last line */}
                {index === manifestItems.length - 1 && (
                  <ArrowRight className="manifesto-char w-6 h-6 md:w-10 md:h-10 text-white opacity-20 transition-transform group-hover:translate-x-2" />
                )}
              </h2>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};