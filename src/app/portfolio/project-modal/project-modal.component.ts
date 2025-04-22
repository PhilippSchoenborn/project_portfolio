import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../project.model';

/**
 * ProjectModalComponent is responsible for displaying a modal that shows detailed
 * information about a specific project. It includes navigation options to view the next project
 * and a close button to dismiss the modal.
 */
@Component({
  selector: 'app-project-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.scss'],
})
export class ProjectModalComponent {

  /**
   * The project to display in the modal. This is passed in from the parent component.
   */
  @Input() project!: Project;

  /**
   * The currently selected language for the modal content ('EN' for English, 'DE' for German).
   * This is passed in from the parent component.
   */
  @Input() selectedLanguage!: 'EN' | 'DE';

  /**
   * EventEmitter that emits when the modal should be closed.
   * The parent component listens for this event to close the modal.
   */
  @Output() close = new EventEmitter<void>();

  /**
   * EventEmitter that emits when the next project should be displayed.
   * The parent component listens for this event to show the next project.
   */
  @Output() next = new EventEmitter<void>();

  /**
   * Emits a close event to the parent component to dismiss the modal.
   */
  onClose() {
    this.close.emit();
  }

  /**
   * Emits a next event to the parent component to show the next project.
   */
  onNextProject() {
    this.next.emit();
  }

  /**
   * Opens the specified URL in a new tab.
   * @param url - The URL to open in a new browser tab.
   */
  openLink(url: string): void {
    if (url) {
      window.open(url, '_blank');
    }
  }

  /**
   * Returns the path to the icon associated with the specified technology.
   * @param tech - The technology (e.g., 'CSS', 'HTML', 'Angular') for which the icon is needed.
   * @returns The relative path to the corresponding technology icon.
   */
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
        return 'assets/img/icons/default_icon.svg';
    }
  }
}
