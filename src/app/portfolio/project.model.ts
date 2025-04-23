export interface Project {
  id: number;
  title: string;
  subtitle: { EN: string; DE: string };
  description: { EN: string; DE: string };
  technologies: string[];
  githubLink: string;
  liveLink: string;
  imageUrl: string;
  modalImageUrl: string;
}
