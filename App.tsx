import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Portfolio } from './components/Portfolio';
import { ProjectDetail } from './components/ProjectDetail';
import { Project } from './types';
import { projects } from './data';

const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleNextProject = () => {
    if (!selectedProject) return;
    
    const currentIndex = projects.findIndex(p => p.id === selectedProject.id);
    // Loop circular: si es el último, vuelve al primero
    const nextIndex = (currentIndex + 1) % projects.length;
    
    setSelectedProject(projects[nextIndex]);
  };

  return (
    <div className="min-h-screen bg-impacto-light selection:bg-black selection:text-white">
      
      {/* Editorial Modal Overlay */}
      {selectedProject && (
        <ProjectDetail 
          key={selectedProject.id} // Key fuerza el remontaje para reproducir la intro animada
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
          onNext={handleNextProject}
        />
      )}

      <main>
        {/* Z-Index 30 + Bg White para cubrir el fondo fijo de About */}
        <div className="relative z-30 bg-white">
          <Hero />
        </div>
        
        {/* About Section: Fondo Fijo z-0, Texto z-10 */}
        <About />

        {/* Z-Index 30 + Bg Black para cubrir el fondo fijo de About al hacer scroll */}
        <div className="relative z-30 bg-black">
          <Portfolio onProjectSelect={setSelectedProject} />
        </div>
      </main>
    </div>
  );
};

export default App;