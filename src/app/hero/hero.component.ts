import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../language.service';
import { Router } from '@angular/router';

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
 * The constructor injects the necessary services into the component.
 * @param {LanguageService} languageService The language service used to manage language selection.
 * @param {Router} router The Angular router used for navigation within the application.
 */
constructor(private languageService: LanguageService, private router: Router) {}

/**
 * Lifecycle hook that is called when the component is initialized.
 * It subscribes to the language service to update the selected language whenever the language changes.
 */
ngOnInit(): void {
  this.languageService.language$.subscribe(lang => {
    this.selectedLanguage = lang;
  });
}


  /**
   * Navigates and scrolls to a section by ID.
   * @param fragment ID of the element to scroll to.
   */
  navigate(fragment: string) {
    if (this.router.url.startsWith('/') && !this.router.url.includes('legal-notice')) {
      setTimeout(() => {
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);
    } else {
      this.router.navigateByUrl('/', { skipLocationChange: false }).then(() => {
        setTimeout(() => {
          const element = document.getElementById(fragment);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 0);
      });
    }
  }
}
