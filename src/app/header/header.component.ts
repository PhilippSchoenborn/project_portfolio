import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router'; // ✅ RouterModule hinzugefügt
import { LanguageService } from '../language.service';

/**
 * HeaderComponent handles the header section of the application.
 * It includes the language selection, navigation menu toggle, and provides language translations for navigation links.
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule // ✅ RouterModule eingebunden, damit routerLink/fragment funktioniert
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

  hideNavElements(): boolean {
    const hiddenRoutes = ['/legal-notice'];
    return hiddenRoutes.includes(this.router.url);
  }

  ngOnInit(): void {
    this.languageService.language$.subscribe(lang => {
      this.selectedLanguage = lang;
    });
  }

  setLanguage(language: 'EN' | 'DE') {
    this.languageService.setLanguage(language);
    const currentUrl = this.router.url.split('?')[0];
    const newUrl = `/${language}${currentUrl}`;
    this.router.navigateByUrl(newUrl);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  navigate(fragment: string) {
    this.menuOpen = false;
  
    // Wenn du bereits auf '/' bist, scroll nur
    if (this.router.url.startsWith('/') && !this.router.url.includes('legal-notice')) {
      setTimeout(() => {
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);
    } else {
      // Andernfalls navigiere zur Startseite und scrolle danach
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
  

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.menuOpen && !this._eref.nativeElement.contains(event.target)) {
      this.menuOpen = false;
    }
  }
}
