import React from 'react';
import { Hero } from './components/Hero';
import { Portfolio } from './components/Portfolio';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-impacto-light selection:bg-black selection:text-white">
      {/* NO NAVIGATION BAR */}
      
      <main>
        <Hero />
        
        {/* 
           THE MASTER TRACK
           Contains: Projects (1-5) -> Manifesto -> Contact 
           All in one horizontal swipe.
        */}
        <Portfolio />
        
        {/* NO FOOTER */}
      </main>
    </div>
  );
};

export default App;