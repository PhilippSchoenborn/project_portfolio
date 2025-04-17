import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  scrollToNavbar() {
    const heroElement = document.getElementById('navbar'); // Find the navbar with id "navbar"
    if (heroElement) {
      heroElement.scrollIntoView({ behavior: 'smooth' }); // Smoothly scroll to the navbar
    } else {
      console.warn('navbar element not found!');
    }
  }

}