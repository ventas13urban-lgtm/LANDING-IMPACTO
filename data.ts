import { Project } from './types';

const GITHUB_BASE = "https://raw.githubusercontent.com/ventas13urban-lgtm/impacto-landing-assets/main";

export const projects: Project[] = [
  { 
    id: '01', 
    title: 'Grupo Tangassi', 
    description: 'ESTRATEGIA DIGITAL Y CAPTACIÓN.',
    fullDescription: 'Desde 2023 desarrollamos la estrategia integral del grupo: planificación, ejecución y sistemas de venta. Implementamos una dirección de arte fresca y elegante que convierte más de $5 millones de pesos al año en resultados comerciales.',
    service: 'Estrategia Digital · Sistemas de Venta · Dirección de Arte',
    year: '2023 – Presente',
    image: `${GITHUB_BASE}/thumb%20tangassi.jpg`,
    gallery: [
      `${GITHUB_BASE}/thumb%20orno.jpg`,
      `${GITHUB_BASE}/thumb%20vetra.jpg`,
      `${GITHUB_BASE}/thumb%20tangassi.jpg`
    ]
  },
  { 
    id: '02', 
    title: 'Orno Taller', 
    description: 'CAFÉ, CERÁMICA Y EXPERIENCIA.',
    fullDescription: 'Café, cerámica y experiencia. En 2025 desarrollamos el branding y la identidad de marca del emprendimiento, construyendo un sistema visual coherente y contemporáneo.',
    service: 'Branding · Identidad Visual',
    year: '2025',
    image: `${GITHUB_BASE}/thumb%20orno.jpg`,
    gallery: [
      `${GITHUB_BASE}/thumb%20silvestre.jpg`,
      `${GITHUB_BASE}/thumb%20orno.jpg`,
      `${GITHUB_BASE}/20250906_1809_Hydraulic%20Submersion%20Macro_simple_compose_01k4gr1k3seg6shs4w1pfmmvwx.png`
    ]
  },
  { 
    id: '03', 
    title: 'Vetra Bikes', 
    description: 'LANZAMIENTO E-COMMERCE.',
    fullDescription: 'Emprendimiento de ecommerce de bicicletas eléctricas. En 2025 desarrollamos su branding e identidad de marca, creando un sistema visual funcional y orientado a conversión.',
    service: 'Branding · Identidad Visual',
    year: '2025',
    image: `${GITHUB_BASE}/thumb%20vetra.jpg`,
    gallery: [
      `${GITHUB_BASE}/thumb%20tangassi.jpg`,
      `${GITHUB_BASE}/thumb%20vetra.jpg`,
      `${GITHUB_BASE}/thumb%20silvestre.jpg`
    ]
  },
  { 
    id: '04', 
    title: 'Silvestre', 
    description: 'IDENTIDAD VISUAL Y COMUNIDAD.',
    fullDescription: 'Startup tecnológica de lentes inteligentes. Desarrollamos el branding, la identidad de marca y todo el sistema de diseño y comunicación para un producto con GPS, realidad aumentada, data tracking y navegación.',
    service: 'Branding · Identidad Visual · Diseño & Comunicación',
    year: '2025',
    image: `${GITHUB_BASE}/thumb%20silvestre.jpg`,
    gallery: [
      `${GITHUB_BASE}/thumb%20orno.jpg`,
      `${GITHUB_BASE}/thumb%20silvestre.jpg`,
      `${GITHUB_BASE}/thumb%20vetra.jpg`
    ]
  },
  { 
    id: '05', 
    title: 'BAMSA', 
    description: 'SISTEMAS DE AGUA INDUSTRIALES.',
    fullDescription: 'Fábrica de sistemas de bombeo industrial. En 2025 desarrollamos su estrategia digital, identidad visual y sistemas de venta, alineando comunicación técnica con objetivos comerciales claros.',
    service: 'Estrategia Digital · Identidad Visual · Sistemas de Venta',
    year: '2025',
    image: `${GITHUB_BASE}/20250906_1809_Hydraulic%20Submersion%20Macro_simple_compose_01k4gr1k3seg6shs4w1pfmmvwx.png`,
    gallery: [
      `${GITHUB_BASE}/thumb%20tangassi.jpg`,
      `${GITHUB_BASE}/20250906_1809_Hydraulic%20Submersion%20Macro_simple_compose_01k4gr1k3seg6shs4w1pfmmvwx.png`,
      `${GITHUB_BASE}/thumb%20orno.jpg`
    ]
  },
];