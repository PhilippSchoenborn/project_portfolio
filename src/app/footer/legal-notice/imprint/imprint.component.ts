import { CommonModule } from '@angular/common';
import { Component, OnInit, HostListener } from '@angular/core';
import { LanguageService } from '../../../language.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-imprint',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './imprint.component.html',
  styleUrls: ['./imprint.component.scss']
})
export class ImprintComponent implements OnInit {
  selectedLanguage: 'EN' | 'DE' = 'EN';

  cursorX = 0;
  cursorY = 0;

  /**
   * Event listener for mouse movement on the document.
   * Updates the cursor's X and Y position properties with the current
   * mouse coordinates relative to the viewport.
   * @param event - The MouseEvent containing the cursor's current position.
   */
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.cursorX = event.clientX;
    this.cursorY = event.clientY;
  }

  translations = {
    EN: {
      heading1: 'Imprint',
      heading2: 'Information acc. to § 5 TMG',
      block2: `
        <p>
          Philipp Schönborn<br>
          Baumschulenring 26<br>
          72202 Nagold
        </p>
      `,
      heading3: 'Contact',
      block3: `
        <p>
          Phone: +49 (0) 176 306 785 30<br>
          E-Mail:
          <a href="mailto:philipp@schoenborn-home.de">
            philipp&#64;schoenborn-home.de
          </a>
        </p>
      `,
      heading4: 'Editorially Responsible',
      block4: `
               <p>
          Philipp Schönborn<br>
          Baumschulenring 26<br>
          72202 Nagold
        </p>
       <p>
          Cenk Korkmaz<br>
          Kleinhöchbergerstraße 45<br>
          71560 Sulzbach an der Murr
        </p>
      `,
      block5: `
        <p>
          Source:
          <a href="https://www.e-recht24.de"
             target="_blank"
             rel="noopener nofollow">
            https://www.e-recht24.de
          </a>
        </p>
      `
    },
    DE: {
      heading1: 'Impressum',
      heading2: 'Angaben gemäß § 5 TMG',
      block2: `
        <p>
          Philipp Schönborn<br>
          Baumschulenring 26<br>
          72202 Nagold
        </p>
      `,
      heading3: 'Kontakt',
      block3: `
        <p>
        <p>
          Telefon: +49 (0) 176 306 785 30<br>
          E-Mail:
          <a href="mailto:philipp@schoenborn-home.de">
            philipp&#64;schoenborn-home.de
          </a>
        </p>
      `,
      heading4: 'Redaktionell verantwortlich',
      block4: `
              <p>
          Philipp Schönborn<br>
          Baumschulenring 26<br>
          72202 Nagold
        </p>
       <p>
          Cenk Korkmaz<br>
          Kleinhöchbergerstraße 45<br>
          71560 Sulzbach an der Murr
        </p>
      `,
      block5: `
        <p>
          Quelle:
          <a href="https://www.e-recht24.de"
             target="_blank"
             rel="noopener nofollow">
            https://www.e-recht24.de
          </a>
        </p>
      `
    },
  };

  /**
   * Constructs the DataProtectionComponent and injects required services.
   * @param languageService - Service for managing the application's selected language.
   * @param router - Angular Router for navigating between routes.
   * @param route - Provides access to information about a route associated with a component.
   */
  constructor(
    private languageService: LanguageService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  /**
   * Angular lifecycle hook that is called after the component's data-bound properties are initialized.
   * Subscribes to the current language observable to update the component’s language state dynamically.
   */
  ngOnInit(): void {
    this.languageService.language$.subscribe(lang => {
      this.selectedLanguage = lang;
    });
  }

    /**
   * After the view is initialized, this method scrolls smoothly to the element with the ID 'top'.
   * Useful when needing to programmatically scroll to a known anchor point after navigation.
   */
    ngAfterViewInit(): void {
      const top = document.getElementById('top');
      if (top) {
        const elementPosition = top.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - 98;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }

  /**
   * Navigates back to the main (root) page while preserving the currently selected language
   * as a query parameter in the URL.
   */
  goBackToMainPage(): void {
    this.router.navigate(
      ['/'],
      { queryParams: { lang: this.selectedLanguage } }
    );
  }
}