import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu'; 
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { DataProtectionComponent } from './data-protection/data-protection.component';
import { ImprintComponent } from './imprint/imprint.component';
import { MatDialogConfig } from '@angular/material/dialog';

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
export class LegalNoticeComponent {
  
  constructor(private dialog: MatDialog) {}

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
