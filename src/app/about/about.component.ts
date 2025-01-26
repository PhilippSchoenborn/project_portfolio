import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../language.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  selectedLanguage: 'EN' | 'DE' = 'EN';

  translations = {
    EN: {
      WHO_I_AM: 'Who I Am',
      ABOUT_ME: 'About Me',
      DESCRIPTION: `Hi, I’m a German-speaking Frontend Developer based in Sulzbach an der Murr. 
      Motivated by the limitless opportunities within IT, I am excited about crafting visually 
      captivating and intuitive websites and applications.`,
      LOCATION: `Highly focused in terms of working, I can work effectively both remotely and on site.`,
      MIND_SET: `I am open-minded and always looking for personal challenges to constantly 
      improve my knowledge and skills.`,
      PRO: `In my profession, programming isn't just about writing code; 
      it's a creative form of problem-solving. I take pride in my ability to distill complex 
      technical challenges into simple, user-friendly solutions, helping you achieve your goals.`,
    },
    DE: {
      WHO_I_AM: 'Wer ich bin',
      ABOUT_ME: 'Über mich',
      DESCRIPTION: `Hallo, ich bin ein deutschsprachiger Frontend-Entwickler aus Sulzbach an der Murr. 
      Durch die unbegrenzten Möglichkeiten in der IT bin ich motiviert, 
      visuell ansprechende und intuitive Webseiten und Anwendungen zu gestalten.`,
      LOCATION: `Ich arbeite sehr fokussiert und kann sowohl remote als auch vor Ort effektiv arbeiten.`,
      MIND_SET: `Ich bin offen für Neues und suche ständig nach persönlichen Herausforderungen, 
      um mein Wissen und meine Fähigkeiten weiterzuentwickeln.`,
      PRO: `In meinem Beruf geht es beim Programmieren nicht nur ums reine Coden, 
      sondern um kreative Problemlösung. Ich lege großen Wert darauf, 
      komplexe technische Herausforderungen in einfache, benutzerfreundliche Lösungen zu verwandeln, 
      damit du deine Ziele erreichst.`,
    }
  };

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    // Subscribe so we know when the user changes the language in Hero
    this.languageService.language$.subscribe(lang => {
      this.selectedLanguage = lang;
    });
  }

  // This is optional if you have separate language buttons in About
  setLanguage(language: 'EN' | 'DE') {
    this.languageService.setLanguage(language);
  }

  showBackground() {
    const bg = document.getElementById('profile-bg');
    if (bg) {
      bg.classList.add('visible');
    }
  }
}
