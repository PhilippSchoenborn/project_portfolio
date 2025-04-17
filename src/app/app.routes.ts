import { Routes }             from '@angular/router';
import { HomeComponent }      from './app/home/home.component';
import { LegalNoticeComponent } from './footer/legal-notice/legal-notice.component';

export const routes: Routes = [
  { path: '',              component: HomeComponent },
  { path: 'legal-notice',  component: LegalNoticeComponent },
  { path: '**',            redirectTo: '' }
];
