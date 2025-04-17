import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../language.service';

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

  constructor(
    private languageService: LanguageService,
    private _eref: ElementRef
  ) { }

  ngOnInit(): void {
    this.languageService.language$.subscribe(lang => {
      this.selectedLanguage = lang;
    });
  }

  setLanguage(language: 'EN' | 'DE') {
    this.languageService.setLanguage(language);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  navigate(link: string) {
    // close the burger menu; scrolling/anchor logic still works by href="#…"
    this.menuOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.menuOpen && !this._eref.nativeElement.contains(event.target)) {
      this.menuOpen = false;
    }
  }
}
