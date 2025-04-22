import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../language.service';

/**
 * HeroComponent represents the hero section of the webpage, featuring the title, navigation, and call-to-action buttons.
 * It handles the dynamic language switching and displays a set of predefined translations for each supported language.
 */
@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {
  selectedLanguage: 'EN' | 'DE' = 'EN';
  translations = {
    EN: {
      NAV1: 'About',
      NAV2: 'Projects',
      NAV3: 'Contact',
      HERO_TITLE: 'Frontend Developer',
      HERO_BTN1: 'Check my Work',
      HERO_BTN2: 'Contact me',
      MARQUEE1: 'Available for remote work',
      MARQUEE2: 'Frontend Developer',
      MARQUEE3: 'Based in Nagold',
      MARQUEE4: 'Open to work'
    },
    DE: {
      NAV1: 'Über mich',
      NAV2: 'Projekte',
      NAV3: 'Kontakt',
      HERO_TITLE: 'Frontend-Entwickler',
      HERO_BTN1: 'Meine Arbeit',
      HERO_BTN2: 'Kontakt',
      MARQUEE1: 'Für Remote-Arbeit verfügbar',
      MARQUEE2: 'Frontend-Entwickler',
      MARQUEE3: 'Ansässig in Nagold',
      MARQUEE4: 'Offen für neue Projekte'
    }
  };

  /**
   * Creates an instance of HeroComponent.
   * @param languageService The service that handles language selection and switching.
   */
  constructor(private languageService: LanguageService) { }

  /**
   * Lifecycle hook called when the component is initialized.
   * Subscribes to the language service to update the selected language dynamically.
   */
  ngOnInit(): void {
    this.languageService.language$.subscribe(lang => {
      this.selectedLanguage = lang;
    });
  }
}
