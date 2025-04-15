import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from './project.model';
import { ProjectModalComponent } from './project-modal/project-modal.component';
import { LanguageService } from '../language.service';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, ProjectModalComponent], // Import the standalone modal
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent {
  // Translations for the portfolio and modal
  translations = {
    EN: {
      PORTFOLIO: 'Portfolio',
      HEADLINE: 'Featured Projects',
      SUBLINE: 'Explore a selection of my work here - Interact with projects to see my skills in action.',
      MODAL: {
        TITLE: 'Project Details',
        SUBTITLE: 'What is this project about?',
        GITHUB: 'GitHub',
        LIVE_TEST: 'Live Test',
        NEXT_PROJECT: 'Next Project',
      },
    },
    DE: {
      PORTFOLIO: 'Portfolio',
      HEADLINE: 'Ausgewählte Projekte',
      SUBLINE: 'Entdecken Sie hier eine Auswahl meiner Arbeiten hier - Interagieren sie mit den Projekten um meine Fähigkeiten in Aktion zu sehen.',
      MODAL: {
        TITLE: 'Projektdetails',
        SUBTITLE: 'Worum geht es bei diesem Projekt?',
        GITHUB: 'GitHub',
        LIVE_TEST: 'Live-Test',
        NEXT_PROJECT: 'Nächstes Projekt',
      },
    },
  };

  selectedLanguage: 'EN' | 'DE' = 'EN'; // Track the selected language
  selectedProject: Project | null = null; // Currently selected project

  projects: Project[] = [
    {
      id: 1,
      title: 'Join',
      subtitle: {
        EN: 'What is this project about?',
        DE: 'Worum geht es bei diesem Projekt?',
      },
      description: {
        EN: 'Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories.',
        DE: 'Ein Aufgabenmanager, inspiriert vom Kanban-System. Erstellen und organisieren Sie Aufgaben mit Drag-and-Drop-Funktionen, weisen Sie Benutzer und Kategorien zu.',
      },
      technologies: ['CSS', 'HTML', 'Firebase', 'Angular', 'TypeScript'],
      githubLink: 'https://github.com/PhilippSchoenborn/project_join',
      liveLink: 'https://philipp-schoenborn.de/join',
      imageUrl: 'assets/img/pop-ups/join_pop_up.svg',
      modalImageUrl: 'assets/img/pop-ups/modal_join.svg',
    },
    {
      id: 2,
      title: 'El Pollo Loco',
      subtitle: {
        EN: 'What is this project about?',
        DE: 'Worum geht es bei diesem Projekt?',
      },
      description: {
        EN: 'Jump, run and throw game based on object-oriented approach. Help Pepe to find coins and tabasco salsa to fight against the crazy hen.',
        DE: 'Ein Jump-and-Run-Spiel basierend auf einem objektorientierten Ansatz. Helfen Sie Pepe, Münzen und Tabasco-Salsa zu finden, um gegen das verrückte Huhn zu kämpfen.',
      },
      technologies: ['JavaScript', 'HTML', 'CSS'],
      githubLink: 'https://github.com/PhilippSchoenborn/El_Pollo_Loco_Phil_Cenk',
      liveLink: 'https://philipp-schoenborn.de/elpolloloco',
      imageUrl: 'assets/img/pop-ups/el_pollo_loco.svg',
      modalImageUrl: 'assets/img/pop-ups/modal_loco.svg',
    },
    // {
    //   id: 3,
    //   title: 'DABubble',
    //   subtitle: {
    //     EN: 'What is this project about?',
    //     DE: 'Worum geht es bei diesem Projekt?',
    //   },
    //   description: {
    //     EN: 'This App is a Slack Clone App. It revolutionizes team communication and collaboration with its intuitive interface, real-time messaging, and robust channel organization.',
    //     DE: 'Diese App ist eine Slack-Clone-App. Sie revolutioniert die Teamkommunikation und -zusammenarbeit mit einer intuitiven Benutzeroberfläche, Echtzeitnachrichten und robuster Kanalorganisation.',
    //   },
    //   technologies: ['Angular', 'Firebase', 'TypeScript'],
    //   githubLink: '#',
    //   liveLink: '#',
    //   imageUrl: 'assets/img/pop-ups/da_bubble_pop_up.svg',
    //   modalImageUrl: 'assets/img/pop-ups/modal_bubble.svg',
    // },
  ];

  constructor(private languageService: LanguageService) { }

  ngOnInit(): void {
    this.languageService.language$.subscribe((lang) => {
      this.selectedLanguage = lang;
    });
  }

  openModal(project: Project) {
    this.selectedProject = project;
    document.body.classList.add('no-scroll');
  }

  closeModal() {
    this.selectedProject = null;
    document.body.classList.remove('no-scroll');
  }

  nextProject() {
    if (this.selectedProject) {
      let currentIndex = this.projects.findIndex(
        (p) => p.id === this.selectedProject!.id
      );
      currentIndex = (currentIndex + 1) % this.projects.length;
      this.selectedProject = this.projects[currentIndex];
    }
  }
}
