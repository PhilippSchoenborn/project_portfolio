import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { LanguageService } from '../language.service';

/**
 * HeaderComponent handles the header section of the application.
 * It includes the language selection, navigation menu toggle, and provides language translations for navigation links.
 * It also manages navigation to anchor fragments and the visibility of certain elements based on the route.
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  selectedLanguage: 'EN' | 'DE' = 'EN';
  menuOpen: boolean = false;

  translations = {
    EN: {
      NAV1: 'About',
      NAV2: 'Projects',
      NAV3: 'Contact'
    },
    DE: {
      NAV1: 'Über mich',
      NAV2: 'Projekte',
      NAV3: 'Kontakt'
    }
  };

  constructor(
    private languageService: LanguageService,
    private _eref: ElementRef,
    public router: Router
  ) {}

  /**
   * Determines whether to hide the navigation elements based on the current route.
   * Routes like '/legal-notice' will hide the navigation elements.
   * @returns {boolean} True if the navigation elements should be hidden, otherwise false.
   */
  hideNavElements(): boolean {
    const hiddenRoutes = ['/legal-notice'];
    return hiddenRoutes.includes(this.router.url);
  }

  /**
   * Initializes the component and subscribes to the language service to dynamically update the selected language.
   */
  ngOnInit(): void {
    this.languageService.language$.subscribe(lang => {
      this.selectedLanguage = lang;
    });
  }

  /**
   * Changes the selected language and updates the route to reflect the new language.
   * @param {('EN' | 'DE')} language The new language to set ('EN' for English, 'DE' for German).
   */
  setLanguage(language: 'EN' | 'DE') {
    this.languageService.setLanguage(language);
    const currentUrl = this.router.url.split('?')[0];
    const newUrl = `/${language}${currentUrl}`;
    this.router.navigateByUrl(newUrl);
  }

  /**
   * Toggles the visibility of the menu (open or closed).
   */
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  /**
   * Navigates to the provided fragment and smoothly scrolls to the corresponding element in the page.
   * If the current route is not the homepage, it first navigates to the home page before scrolling to the fragment.
   * @param {string} fragment The ID of the element to scroll to.
   */
  navigate(fragment: string) {
    this.menuOpen = false;
    const scrollToFragment = () => {
      const element = document.getElementById(fragment);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    };
    const navigateToHomeAndScroll = () => {
      this.router.navigateByUrl('/', { skipLocationChange: false }).then(scrollToFragment);
    };
    if (this.router.url.startsWith('/') && !this.router.url.includes('legal-notice')) {
      setTimeout(scrollToFragment, 0);
    } else {
      setTimeout(navigateToHomeAndScroll, 0);
    }
  }
  
  /**
   * Closes the menu if a click outside of the menu is detected.
   * This is achieved using the HostListener to listen for the 'click' event on the document.
   * @param {MouseEvent} event The click event that is triggered.
   */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.menuOpen && !this._eref.nativeElement.contains(event.target)) {
      this.menuOpen = false;
    }
  }
}
