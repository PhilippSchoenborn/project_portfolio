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

/**
 * Component that handles legal notices, such as data protection and imprint.
 * It provides functionality to open dialogs for Data Protection and Imprint information.
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

  /** Subscription for data protection trigger observable */
  private subscription!: Subscription;

  /**
   * Constructor to initialize the component with necessary services.
   * @param dialog The Angular Material Dialog service for handling modal dialogs.
   * @param dialogService The DialogService to manage triggers for data protection and imprint dialogs.
   */
  constructor(private dialog: MatDialog, private dialogService: DialogService) { }

  /**
   * Lifecycle hook that is called when the component is initialized.
   * Subscribes to the data protection trigger observable to open the Data Protection dialog when needed.
   */
  ngOnInit() {
    this.subscription = this.dialogService.dataProtectionTrigger$.subscribe(() => {
      this.openDataProtection();
    });
  }

  /**
   * Lifecycle hook that is called when the component is destroyed.
   * Unsubscribes from the data protection trigger observable to prevent memory leaks.
   */
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  /**
   * Opens the Data Protection dialog with custom configuration.
   * This dialog is opened in full-screen mode with specific styling.
   */
  openDataProtection() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '99vw';
    dialogConfig.height = '100vh';
    dialogConfig.autoFocus = false;
    dialogConfig.panelClass = 'custom-dialog';
    if (!this.dialog.openDialogs.length) {
      this.dialog.open(DataProtectionComponent, dialogConfig);
    }
  }

  /**
   * Opens the Imprint dialog with specific configuration for size and styling.
   */
  openImprint() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '600px';
    dialogConfig.height = '460px';
    dialogConfig.autoFocus = true;
    dialogConfig.panelClass = 'custom-dialog';
    if (!this.dialog.openDialogs.length) {
      this.dialog.open(ImprintComponent, dialogConfig);
    }
  }
}
