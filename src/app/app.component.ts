import { Component }      from '@angular/core';
import { RouterOutlet }   from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

/**
 * The root component of the application.
 * This component serves as the wrapper for the entire app, containing the header, footer, 
 * and the router outlet where different views (components) will be rendered based on the active route.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent
  ],
  template: 
    `<app-header></app-header>
     <router-outlet></router-outlet>
     <app-footer></app-footer>`
  
})
export class AppComponent {}