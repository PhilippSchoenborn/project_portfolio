import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../hero/hero.component';
import { AboutComponent } from '../about/about.component';
import { SkillsComponent } from '../skills/skills.component';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { CommentsComponent } from '../comments/comments.component';
import { ContactComponent } from '../contact/contact.component';

/**
 * HomeComponent serves as the main container for the portfolio page.
 * It integrates several child components such as Hero, About, Skills, Portfolio, Comments, and Contact.
 * This component manages the overall structure of the home page, including setting the page title and language.
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    PortfolioComponent,
    CommentsComponent,
    ContactComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  title = 'portfolio';
  selectedLanguage: 'en' | 'de' = 'en';
  cursorX = 0;
  cursorY = 0;
  
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.cursorX = event.clientX;
    this.cursorY = event.clientY;
  }
}
