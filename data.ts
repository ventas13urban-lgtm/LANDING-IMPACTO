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
    image: `${GITHUB_BASE}/WEB_TANGASSI4.jpg`,
    gallery: [
      `${GITHUB_BASE}/WEB_TANGASSI2.jpg`,
      `${GITHUB_BASE}/WEB_TANGASSI3.jpg`,
      `${GITHUB_BASE}/WEB_TANGASSI1.jpg`
    ]
  },
  { 
    id: '02', 
    title: 'Orno Taller', 
    description: 'CAFÉ, CERÁMICA Y EXPERIENCIA.',
    fullDescription: 'Café, cerámica y experiencia. En 2025 desarrollamos el branding y la identidad de marca del emprendimiento, construyendo un sistema visual coherente y contemporáneo.',
    service: 'Branding · Identidad Visual',
    year: '2025',
    image: `${GITHUB_BASE}/WEB_ORNO3.jpg`,
    gallery: [
      `${GITHUB_BASE}/WEB_ORNO1.jpg`,
      `${GITHUB_BASE}/WEB_ORNO6.jpg`,
      `${GITHUB_BASE}/WEB_ORNO7.jpg`
    ]
  },
  { 
    id: '03', 
    title: 'Vetra Bikes', 
    description: 'LANZAMIENTO E-COMMERCE.',
    fullDescription: 'Emprendimiento de ecommerce de bicicletas eléctricas. En 2025 desarrollamos su branding e identidad de marca, creando un sistema visual funcional y orientado a conversión.',
    service: 'Branding · Identidad Visual',
    year: '2025',
    image: `${GITHUB_BASE}/WEB_VETRA4.jpg`,
    gallery: [
      `${GITHUB_BASE}/WEB_VETRA2.jpg`,
      `${GITHUB_BASE}/WEB_VETRA1.jpg`,
      `${GITHUB_BASE}/WEB_VETRA7.jpg`
    ]
  },
  { 
    id: '04', 
    title: 'Silvestre', 
    description: 'IDENTIDAD VISUAL Y COMUNIDAD.',
    fullDescription: 'Startup tecnológica de lentes inteligentes. Desarrollamos el branding, la identidad de marca y todo el sistema de diseño y comunicación para un producto con GPS, realidad aumentada, data tracking y navegación.',
    service: 'Branding · Identidad Visual · Diseño & Comunicación',
    year: '2025',
    image: `${GITHUB_BASE}/WEB_SILVESTRE6.jpg`,
    gallery: [
      `${GITHUB_BASE}/WEB_SILVESTRE3.jpg`,
      `${GITHUB_BASE}/WEB_SILVESTRE4.jpg`,
      `${GITHUB_BASE}/WEB_SILVESTRE2.jpg`
    ]
  },
  { 
    id: '05', 
    title: 'BAMSA', 
    description: 'SISTEMAS DE AGUA INDUSTRIALES.',
    fullDescription: 'Fábrica de sistemas de bombeo industrial. En 2025 desarrollamos su estrategia digital, identidad visual y sistemas de venta, alineando comunicación técnica con objetivos comerciales claros.',
    service: 'Estrategia Digital · Identidad Visual · Sistemas de Venta',
    year: '2025',
    image: `${GITHUB_BASE}/WEB_BAMSA2.jpg`,
    gallery: [
      `${GITHUB_BASE}/WEB_BAMSA1.jpg`,
      `${GITHUB_BASE}/WEB_BAMSA3.jpg`,
      `${GITHUB_BASE}/WEB_BAMSA4.jpg`
    ]
  },
];