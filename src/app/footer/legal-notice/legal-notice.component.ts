import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DataProtectionComponent } from './data-protection/data-protection.component';
import { ImprintComponent } from './imprint/imprint.component';
import { DialogService } from '../../shared/dialog.service';
import { Subscription } from 'rxjs';
import { LanguageService } from '../../language.service';
import { Router, ActivatedRoute } from '@angular/router';

/**
 * LegalNoticeComponent handles the display of legal notices, such as data protection and imprint.
 * It uses Angular Material dialogs for displaying the legal information in a modal format.
 */
@Component({
  selector: 'app-legal-notice',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule
  ],
  templateUrl: './legal-notice.component.html',
  styleUrls: ['./legal-notice.component.scss']
})
export class LegalNoticeComponent implements OnInit, OnDestroy {
  selectedLanguage: 'EN' | 'DE' = 'EN';
  translations = {
    EN: {
      LEGAL_BTN1: 'Data Protection',
      LEGAL_BTN2: 'Imprint',
    },
    DE: {
      LEGAL_BTN1: 'Datenschutz',
      LEGAL_BTN2: 'Impressum',
    },
  };

  private subscription!: Subscription;

  /**
   * Creates an instance of LegalNoticeComponent.
   * @param dialog The Angular Material dialog service used to open modals.
   * @param dialogService A service for handling dialog-related actions.
   * @param languageService Service for managing language settings and language changes.
   * @param router The Angular router used for navigation.
   * @param route Activated route to access route parameters.
   */
  constructor(
    private dialog: MatDialog,
    private dialogService: DialogService,
    private languageService: LanguageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  /**
   * Lifecycle hook that is called when the component is initialized.
   * Subscribes to language changes and route parameters for dynamic language switching.
   */
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const lang = params['lang'];
      if (lang === 'EN' || lang === 'DE') {
        this.selectedLanguage = lang;
        this.languageService.setLanguage(lang);
      }
    });
    this.subscription = this.languageService.language$.subscribe(lang => {
      this.selectedLanguage = lang;
    });
    this.dialogService.dataProtectionTrigger$.subscribe(() => {
      this.openDataProtection();
    });
  }

  /**
   * Lifecycle hook that is called when the component is destroyed.
   * Unsubscribes from the language service to prevent memory leaks.
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Opens the data protection dialog using Angular Material's dialog service.
   * Configures the dialog to cover the full screen (99vw and 100vh).
   */
  openDataProtection(): void {
    const cfg = new MatDialogConfig();
    cfg.width = '99vw';
    cfg.height = '100vh';
    cfg.autoFocus = false;
    cfg.panelClass = 'custom-dialog';
    if (!this.dialog.openDialogs.length) {
      this.dialog.open(DataProtectionComponent, cfg);
    }
  }

  /**
   * Opens the imprint dialog using Angular Material's dialog service.
   * Configures the dialog with a fixed width and height (600px and 460px).
   */
  openImprint(): void {
    const cfg = new MatDialogConfig();
    cfg.width = '600px';
    cfg.height = '460px';
    cfg.autoFocus = true;
    cfg.panelClass = 'custom-dialog';
    if (!this.dialog.openDialogs.length) {
      this.dialog.open(ImprintComponent, cfg);
    }
  }

  /**
   * Navigates back to the portfolio page with the selected language as a query parameter.
   */
  goBackToPortfolio(): void {
    this.router.navigate(['/'], { queryParams: { lang: this.selectedLanguage } });
  }

  /**
   * Opens the data protection dialog with the selected language.
   * This method is used for opening the dialog without changing the route.
   */
  openDataProtectionWithLanguage(): void {
    this.openDataProtection();
  }

  /**
   * Opens the imprint dialog with the selected language.
   * This method is used for opening the dialog without changing the route.
   */
  openImprintWithLanguage(): void {
    this.openImprint();
  }
}
