import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../language.service';
import { Router } from '@angular/router';

/**
 * HeaderComponent handles the header section of the application.
 * It includes the language selection, navigation menu toggle, and provides language translations for navigation links.
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
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

  /**
   * Creates an instance of HeaderComponent.
   * @param languageService The service responsible for language selection and switching.
   * @param _eref The reference to the host element for detecting outside clicks.
   */
  constructor(
    private languageService: LanguageService,
    private _eref: ElementRef,
    public router: Router
  ) { }

  hideNavElements(): boolean {
    const hiddenRoutes = ['/legal-notice'];
    return hiddenRoutes.includes(this.router.url);
  }

  /**
   * Lifecycle hook that is called when the component is initialized.
   * Subscribes to the language service to update the selected language when it changes.
   */
  ngOnInit(): void {
    this.languageService.language$.subscribe(lang => {
      this.selectedLanguage = lang;
    });
  }

  /**
   * Sets the selected language by calling the language service.
   * @param language The language to set ('EN' or 'DE').
   */
  setLanguage(language: 'EN' | 'DE') {
    this.languageService.setLanguage(language);
  }

  /**
   * Toggles the state of the navigation menu (open or closed).
   */
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  /**
   * Closes the navigation menu when a link is clicked.
   * @param link The link that was clicked (used for navigation but not implemented in this method).
   */
  navigate(link: string) {
    this.menuOpen = false;
  }

  /**
   * HostListener for detecting clicks outside the menu.
   * If the menu is open and a click occurs outside the header, the menu will be closed.
   * @param event The click event.
   */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.menuOpen && !this._eref.nativeElement.contains(event.target)) {
      this.menuOpen = false;
    }
  }
}
