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

  /**
 * Subscription to the dialog trigger observable.
 */
  private subscription!: Subscription;

  /**
   * Constructor that injects services for dialogs and language handling.
   * 
   * @param dialog Angular Material dialog service for opening modals
   * @param dialogService Custom service to trigger data protection modal
   * @param languageService Custom service to track selected language
   */
  constructor(
    private dialog: MatDialog,
    private dialogService: DialogService,
    private languageService: LanguageService
  ) { }

  /**
   * Lifecycle hook that subscribes to the data protection trigger and language changes.
   */
  ngOnInit(): void {
    this.subscription = this.dialogService.dataProtectionTrigger$.subscribe(() => this.openDataProtection());
    this.languageService.language$.subscribe(lang => this.selectedLanguage = lang);
  }

  /**
   * Lifecycle hook to clean up the subscription.
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Opens the Data Protection dialog with full screen dimensions.
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
   * Opens the Imprint dialog with standard dimensions.
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
}