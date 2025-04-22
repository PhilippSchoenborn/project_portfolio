import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';

/**
 * The application configuration for the Angular app.
 * This configuration provides the necessary setup for the Angular application, including
 * routing, browser module, and asynchronous animation support.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    /**
     * Imports the necessary providers from the BrowserModule.
     * The BrowserModule is required for bootstrapping and provides the basic services
     * needed for running an Angular app in the browser.
     */
    importProvidersFrom(BrowserModule),

    /**
     * Provides the application's routing configuration.
     * The `provideRouter` function initializes the routing for the application using
     * the `routes` configuration, which defines how the app handles navigation between components.
     */
    provideRouter(routes),

    /**
     * Provides asynchronous animation support for the application.
     * This allows Angular to load and initialize animations asynchronously,
     * improving the initial loading performance.
     */
    provideAnimationsAsync()
  ]
};