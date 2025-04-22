import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

/**
 * FooterComponent displays the footer section of the application.
 * It provides functionality to scroll smoothly to the navigation bar.
 */
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  /**
   * Scrolls the page smoothly to the navbar element when invoked.
   * If the navbar element is not found, a warning message is logged to the console.
   */
  scrollToNavbar() {
    const heroElement = document.getElementById('navbar');
    if (heroElement) {
      heroElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.warn('navbar element not found!');
    }
  }
}
