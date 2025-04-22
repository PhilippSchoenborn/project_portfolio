import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LegalNoticeComponent } from './footer/legal-notice/legal-notice.component';

/**
 * The application's routing configuration.
 * This defines how the app handles navigation, specifying which components should be displayed
 * for each route. It also provides fallback for invalid paths.
 */
export const routes: Routes = [

  /**
   * Route for the home page of the application.
   * When the user navigates to the root path ('/'), the `HomeComponent` is displayed.
   */
  { path: '', component: HomeComponent },

  /**
   * Route for the legal notice page.
   * When the user navigates to '/legal-notice', the `LegalNoticeComponent` is displayed.
   */
  { path: 'legal-notice', component: LegalNoticeComponent },

  /**
   * Wildcard route to handle unknown paths.
   * If the user navigates to a route that does not exist, they are redirected to the root path ('/').
   */
  { path: '**', redirectTo: '' }
];
