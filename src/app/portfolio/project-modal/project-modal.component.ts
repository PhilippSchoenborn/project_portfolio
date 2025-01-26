import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../project.model';

@Component({
  selector: 'app-project-modal',
  standalone: true, // Mark this component as standalone
  imports: [CommonModule],
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.scss'],
})
export class ProjectModalComponent {
  @Input() project!: Project;
  @Input() selectedLanguage!: 'EN' | 'DE'; // Pass the current language
  @Output() close = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  onNextProject() {
    this.next.emit();
  }

  // Open link in a new tab
  openLink(url: string): void {
    if (url) {
      window.open(url, '_blank'); // Open the link in a new tab
    }
  }

  // Get the icon path for a technology
  getIconPath(tech: string): string {
    switch (tech.toLowerCase()) {
      case 'css':
        return 'assets/img/icons/modal_css_icon.svg';
      case 'html':
        return 'assets/img/icons/modal_html_icon.svg';
      case 'firebase':
        return 'assets/img/icons/modal_firebase_icon.svg';
      case 'angular':
        return 'assets/img/icons/modal_angular_icon.svg';
      case 'typescript':
        return 'assets/img/icons/modal_ts_icon.svg';
      case 'javascript':
        return 'assets/img/icons/modal_js_icon.svg';
      default:
        return 'assets/img/icons/default_icon.svg'; // Fallback for unknown tech
    }
  }
}
