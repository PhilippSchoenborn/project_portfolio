import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../language.service';

interface Testimonial {
  quote: { EN: string; DE: string };
  author: string;
  role: string;
}

@Component({
  standalone: true,
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  imports: [CommonModule],
})
export class CommentsComponent {
  testimonials: Testimonial[] = [
    {
      quote: {
        EN: "Our project benefited enormously from Philipp’s efficient way of working.",
        DE: "Unser Projekt profitierte enorm von Philipps effizienter Arbeitsweise.",
      },
      author: "D. Laubig",
      role: "Frontend Developer",
    },
    {
      quote: {
        EN: "Philipp has proven to be a reliable group partner. His technical skills and proactive approach were crucial to the success of our project.",
        DE: "Philipp hat sich als zuverlässiger Gruppenpartner erwiesen. Seine technischen Fähigkeiten und sein proaktiver Ansatz waren entscheidend für den Erfolg unseres Projekts.",
      },
      author: "C. Korkmaz",
      role: "Frontend Developer",
    },
    {
      quote: {
        EN: "I had the good fortune of working with Philipp in a group project at the Developer Akademie that involved a lot of effort. He always stayed calm, cool, and focused, and made sure our team was set up for success. He's super knowledgeable, easy to work with, and I'd happily work with him again given the chance.",
        DE: "Ich hatte das Glück, mit Philipp an einem Gruppenprojekt bei der Developer Akademie zu arbeiten, das viel Einsatz erforderte. Er blieb immer ruhig, konzentriert und sorgte dafür, dass unser Team erfolgreich war. Er ist äußerst kompetent, es ist leicht mit ihm zu arbeiten und ich würde jederzeit wieder mit ihm arbeiten.",
      },
      author: "B. Scheiber",
      role: "Frontend Developer",
    },
  ];

  currentIndex: number = 0;
  selectedLanguage: 'EN' | 'DE' = 'EN';

  constructor(private languageService: LanguageService) { }

  ngOnInit(): void {
    this.languageService.language$.subscribe((lang) => {
      this.selectedLanguage = lang;
    });
  }

  get circularSlides(): Testimonial[] {
    const length = this.testimonials.length;
    const prevIndex = (this.currentIndex - 1 + length) % length;
    const nextIndex = (this.currentIndex + 1) % length;

    return [
      this.testimonials[prevIndex],
      this.testimonials[this.currentIndex],
      this.testimonials[nextIndex],
    ];
  }

  transition = 'transform 0.5s ease';

getTransform(): string {
  return `translateX(-${this.currentIndex * 100}%)`;
}

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
  }

  prevSlide(): void {
    this.currentIndex = (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
  }
}
