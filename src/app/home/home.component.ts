import { Component }      from '@angular/core';
import { CommonModule }   from '@angular/common';
import { HeroComponent }      from '../hero/hero.component';
import { AboutComponent }     from '../about/about.component';
import { SkillsComponent }    from '../skills/skills.component';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { CommentsComponent }  from '../comments/comments.component';
import { ContactComponent }   from '../contact/contact.component';
// import { FooterComponent }    from '../footer/footer.component';

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
    // FooterComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  // If you had title/selectedLanguage in AppComponent,
  // move them here too:
  title = 'portfolio';
  selectedLanguage: 'en' | 'de' = 'en';
}