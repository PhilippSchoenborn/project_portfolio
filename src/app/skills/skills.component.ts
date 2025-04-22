import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../language.service';
import { Router } from '@angular/router';

/**
 * Component representing the Skills section of the portfolio.
 * It displays a set of skills and technologies the user is proficient in.
 * The component also provides a way to change languages and interact with the background profile.
 */
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

  /**
   * Constructor that injects the `LanguageService` to allow language selection.
   * @param languageService The service that handles language selection and updates.
   */
  constructor(private languageService: LanguageService, public router: Router) { }

  /**
   * Initializes the component by subscribing to the `language$` observable from the `LanguageService`.
   * This ensures the selected language is updated when the language is changed.
   */
  ngOnInit(): void {
    this.languageService.language$.subscribe(lang => {
      this.selectedLanguage = lang;
    });
  }

  /**
   * Sets the language for the component by passing the selected language ('EN' or 'DE') to the `LanguageService`.
   * @param language The language to be set, either 'EN' or 'DE'.
   */
  setLanguage(language: 'EN' | 'DE') {
    this.languageService.setLanguage(language);
    const currentUrl = this.router.url.split('?')[0];
    const newUrl = `/${language}${currentUrl}`;
    this.router.navigateByUrl(newUrl);
  }

  /**
   * Makes the background profile visible by adding a 'visible' class to the profile background element.
   * This can be used to control the visibility of the profile background through CSS.
   */
  showBackground() {
    const bg = document.getElementById('profile-bg');
    if (bg) {
      bg.classList.add('visible');
    }
  }
}
