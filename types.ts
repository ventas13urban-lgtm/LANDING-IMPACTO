export interface Project {
  id: string;
  title: string;
  category?: string; // Made optional to fit existing usage
  image: string;
  description: string; // Short description used in card (Tagline)
  fullDescription?: string; // Long description used in detail view
  service?: string; // Specific services rendered
  year?: string; // Project year
  outcome?: string; // Made optional
  gallery?: string[]; // Array of images for the editorial view
}

export interface MenuItem {
  label: string;
  href: string;
}