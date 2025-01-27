import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu'; 
import { MatDialogModule, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DataProtectionComponent } from './data-protection/data-protection.component';
import { ImprintComponent } from './imprint/imprint.component';
import { DialogService } from '../../shared/dialog.service'; // Import shared service
import { Subscription } from 'rxjs';

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

  private subscription!: Subscription;
  
  constructor(private dialog: MatDialog, private dialogService: DialogService) {}

  ngOnInit() {
    // Subscribe to the service's trigger for Data Protection
    this.subscription = this.dialogService.dataProtectionTrigger$.subscribe(() => {
      this.openDataProtection(); // Call the existing method to open the dialog
    });
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe(); // Clean up subscription when the component is destroyed
    }
  }

  openDataProtection() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '99vw';
    dialogConfig.height = '100vh';
    dialogConfig.autoFocus = true;
    dialogConfig.panelClass = 'custom-dialog';
    if (!this.dialog.openDialogs.length) {
      this.dialog.open(DataProtectionComponent, dialogConfig);
    }
  }

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
