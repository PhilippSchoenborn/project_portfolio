import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../language.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {
  // Local property to store the current language
  selectedLanguage: 'EN' | 'DE' = 'EN';
  menuOpen: boolean = false; // Tracks burger menu state

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
      MARQUEE3: 'Based in Sulzbach an der Murr',
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
      MARQUEE3: 'Ansässig in Sulzbach an der Murr',
      MARQUEE4: 'Offen für neue Projekte'
    }
  };

  constructor(private languageService: LanguageService) { }

  ngOnInit(): void {
    // Subscribe to the service so we know the current language
    this.languageService.language$.subscribe(lang => {
      this.selectedLanguage = lang;
    });
  }

  // When the user clicks a button to change language
  setLanguage(language: 'EN' | 'DE') {
    this.languageService.setLanguage(language);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen; // Toggles burger menu state
  }

  navigate(link: string) {
    this.menuOpen = false;
    // Logic to navigate to the link
  }
}
