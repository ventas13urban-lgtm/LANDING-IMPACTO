import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-impacto-dark text-white pt-12 pb-6 border-t border-white/10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          
          <div>
            <h4 className="font-sans font-black text-2xl tracking-tighter mb-2">
              IMPACTO<span className="text-impacto-blue">.</span>
            </h4>
            <p className="text-gray-500 text-sm font-mono">
              Marketing de lujo accesible.
            </p>
          </div>

          <div className="flex gap-8 text-sm font-sans font-medium text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">Email</a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 font-mono border-t border-white/5 pt-6">
          <p>© {new Date().getFullYear()} Impacto Digital.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-400">Privacidad</a>
            <a href="#" className="hover:text-gray-400">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  );
};