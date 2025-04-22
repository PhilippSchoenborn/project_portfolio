import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../language.service';
import { Router } from '@angular/router';

/**
 * FooterComponent displays the footer section of the application.
 * It provides functionality to scroll smoothly to the navigation bar.
 */
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  selectedLanguage: 'EN' | 'DE' = 'EN';
  translations = {
    EN: {
      FOOTER_JOB: 'Web Developer',
      FOOTER_COUNTRY: 'Germany',
      FOOTER_LEGAL: 'Legal Notice',
    },
    DE: {
      FOOTER_JOB: 'Webentwickler',
      FOOTER_COUNTRY: 'Deutschland',
      FOOTER_LEGAL: 'Impressum',
    }
  };

  /**
 * Creates an instance of HeroComponent.
 * @param languageService The service that handles language selection and switching.
 */
  constructor(private languageService: LanguageService, public router: Router) { }

  hideFooterExtras(): boolean {
    const hiddenRoutes = ['/legal-notice'];
    return hiddenRoutes.includes(this.router.url);
  }

  /**
   * Lifecycle hook called when the component is initialized.
   * Subscribes to the language service to update the selected language dynamically.
   */
  ngOnInit(): void {
    this.languageService.language$.subscribe(lang => {
      this.selectedLanguage = lang;
    });
  }

  /**
   * Scrolls the page smoothly to the navbar element when invoked.
   * If the navbar element is not found, a warning message is logged to the console.
   */
  scrollToNavbar() {
    const heroElement = document.getElementById('navbar');
    if (heroElement) {
      heroElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.warn('navbar element not found!');
    }
  }
}
