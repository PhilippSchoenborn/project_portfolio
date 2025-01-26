export interface Project {
  id: number;
  title: string;
  subtitle: { EN: string; DE: string }; // Support translations
  description: { EN: string; DE: string }; // Support translations
  technologies: string[];
  githubLink: string;
  liveLink: string;
  imageUrl: string;
  modalImageUrl: string;
}
