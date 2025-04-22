import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LegalNoticeComponent } from './footer/legal-notice/legal-notice.component';
import { DataProtectionComponent } from './footer/legal-notice/data-protection/data-protection.component';
import { ImprintComponent } from './footer/legal-notice/imprint/imprint.component';

/**
 * Define the routing configuration for the Angular application.
 * Routes are mapped to components for different paths in the application.
 * @constant
 * @type {Routes}
 * @description
 * The routes array defines the paths and corresponding components for the application.
 * It allows navigation between pages like the home page, legal notice, data protection, and imprint.
 */
export const routes: Routes = [
  /**
   * Route for the home page.
   * This is the default route of the application.
   * @path '/'
   * @component {HomeComponent}
   */
  { path: '', component: HomeComponent },

  /**
   * Route for the legal notice page.
   * This component displays the legal information for the website.
   * @path 'legal-notice'
   * @component {LegalNoticeComponent}
   */
  { path: 'legal-notice', component: LegalNoticeComponent },

  /**
   * Route for the data protection page.
   * This component displays the data protection/privacy policy.
   * @path 'legal-notice/data-protection'
   * @component {DataProtectionComponent}
   */
  { path: 'legal-notice/data-protection', component: DataProtectionComponent },

  /**
   * Route for the imprint page.
   * This component displays the imprint or legal information about the website.
   * @path 'legal-notice/imprint'
   * @component {ImprintComponent}
   */
  { path: 'legal-notice/imprint', component: ImprintComponent },

  /**
   * Catch-all route for undefined paths.
   * Redirects any unknown or non-existent paths to the home page.
   * @path '**'
   * @redirectTo {''}
   */
  { path: '**', redirectTo: '' }
];
