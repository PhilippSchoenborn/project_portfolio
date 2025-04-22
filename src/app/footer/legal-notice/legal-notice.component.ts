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

  constructor(
    private dialog: MatDialog,
    private dialogService: DialogService,
    private languageService: LanguageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

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

  goBackToPortfolio(): void {
    this.router.navigate(['/'], { queryParams: { lang: this.selectedLanguage } });
  }

  openDataProtectionWithLanguage(): void {
    this.router.navigate(['/data-protection'], { queryParams: { lang: this.selectedLanguage } });
  }

  openImprintWithLanguage(): void {
    this.router.navigate(['/imprint'], { queryParams: { lang: this.selectedLanguage } });
  }
}
