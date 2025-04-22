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
 * The LegalNoticeComponent manages the legal notice section of the application.
 * It allows users to open dialogs for Data Protection and Imprint,
 * and provides a way to navigate back to the portfolio page while preserving the selected language.
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
   * @param dialogService A custom service to trigger the data protection modal.
   * @param languageService A service that handles the language switching logic.
   * @param router The Angular router to navigate programmatically.
   * @param route The activated route service to access route parameters.
   */
  constructor(
    private dialog: MatDialog,
    private dialogService: DialogService,
    private languageService: LanguageService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  /**
   * Lifecycle hook that is called when the component is initialized.
   * Subscribes to the data protection trigger and the language service to update the selected language.
   */
  ngOnInit(): void {
    this.subscription = this.dialogService.dataProtectionTrigger$.subscribe(() => this.openDataProtection());
    this.languageService.language$.subscribe(lang => this.selectedLanguage = lang);
  }

  /**
   * Lifecycle hook that is called when the component is destroyed.
   * Unsubscribes from the language and data protection subscriptions to avoid memory leaks.
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Opens the Data Protection dialog in full-screen mode.
   * Configures the dialog dimensions and appearance before opening.
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
   * Opens the Imprint dialog with fixed width and height.
   * Configures the dialog dimensions and appearance before opening.
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
   * Navigates back to the portfolio page while preserving the selected language.
   * The language is passed as a query parameter in the route.
   */
  goBackToPortfolio(): void {
    this.router.navigate(['/'], { queryParams: { lang: this.selectedLanguage } });
  }
}
