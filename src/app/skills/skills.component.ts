import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../language.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
  selectedLanguage: 'EN' | 'DE' = 'EN';

  translations = {
    EN: {
      TECHNOLOGIES: 'Technologies',
      HEADLINE: 'Skill Set',
      JOURNEY: 'My journey has involved working on diverse projects, employing a range of frontend technologies and concepts. I am open to embracing new technologies and methodologies to continuously enhance my skills and stay ahead in the ever-evolving landscape of web development.',
      SUBLINE: 'You need another skill?',
      SUBLINE_TEXT: 'Feel free to contact me. I look forward to expanding on my previous knowledge.',
      BTN: 'Let’s Talk',
    },
    DE: {
      TECHNOLOGIES: 'Technologien',
      HEADLINE: 'Fähigkeiten',
      JOURNEY: 'Mein Werdegang hat es mir ermöglicht, an unterschiedlichen Projekten zu arbeiten und eine Vielzahl von Frontend-Technologien sowie -Konzepten einzusetzen. Ich bin offen dafür, neue Technologien und Methoden zu übernehmen, um meine Fähigkeiten kontinuierlich zu erweitern und in der sich ständig weiterentwickelnden Welt der Webentwicklung auf dem neuesten Stand zu bleiben.',
      SUBLINE: 'Benötigen Sie eine andere Fähigkeit?',
      SUBLINE_TEXT: 'Kontaktieren Sie mich gern. Ich freue mich darauf, mein bisheriges Wissen zu erweitern.',
      BTN: 'Kontakt',
    }
  };

  constructor(private languageService: LanguageService) { }

  ngOnInit(): void {
    // Subscribe so we know when the user changes the language in Hero
    this.languageService.language$.subscribe(lang => {
      this.selectedLanguage = lang;
    });
  }

  // This is optional if you have separate language buttons in About
  setLanguage(language: 'EN' | 'DE') {
    this.languageService.setLanguage(language);
  }

  showBackground() {
    const bg = document.getElementById('profile-bg');
    if (bg) {
      bg.classList.add('visible');
    }
  }
}