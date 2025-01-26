import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, LegalNoticeComponent],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {}
