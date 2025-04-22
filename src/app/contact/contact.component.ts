import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LanguageService } from '../language.service';
import { DialogService } from '../shared/dialog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  selectedLanguage: 'EN' | 'DE' = 'EN';
  private router = inject(Router);
  translations = {
    EN: {
      TITLE: 'Contact me',
      HEADLINE: 'Let’s work together',
      SUBLINE: 'Got a problem to solve?',
      SUBTEXT1: 'Contact me through this form',
      SUBTEXT2: 'Need a Frontend developer? Let’s talk!',
      FORM_NAME: 'What’s your name?',
      FORM_NAME_PLACEHOLDER: 'Your name goes here',
      FORM_MAIL: 'What’s your email?',
      FORM_EMAIL_PLACEHOLDER: 'your.email@email.com',
      FORM_QUESTION: 'How can I help you?',
      FORM_QUESTION_PLACEHOLDER: 'Hello, I am interested in...',
      PRIVACY_POLICY_1: "I've read the",
      PRIVACY_POLICY_COLOR: "privacy policy",
      PRIVACY_POLICY_2: "and agree to the processing of my data as outlined.",
      PRIVACY_ERROR: 'Please accept the privacy policy.',
      SUBMIT_BUTTON: 'Say Hello :)',
      FORM_NAME_ERROR: 'Please enter a valid name.',
      FORM_EMAIL_ERROR: 'Invalid email format.',
      FORM_MESSAGE_ERROR: 'Your message must be at least 15 characters long.',
      MAIL_SUCCESS: 'Mail has been sent successfully.',
    },
    DE: {
      TITLE: 'Kontaktieren Sie mich',
      HEADLINE: 'Lass uns zusammen-arbeiten',
      SUBLINE: 'Haben Sie ein Problem zu lösen?',
      SUBTEXT1: 'Kontaktieren Sie mich über dieses Formular',
      SUBTEXT2: 'Brauchen Sie einen Frontend-Entwickler? Lass uns reden!',
      FORM_NAME: 'Wie ist Ihr Name?',
      FORM_NAME_PLACEHOLDER: 'Ihr Name kommt hier hin',
      FORM_MAIL: 'Wie lautet Ihre E-Mail?',
      FORM_EMAIL_PLACEHOLDER: 'Ihre.email@email.com',
      FORM_QUESTION: 'Wie kann ich Ihnen helfen?',
      FORM_QUESTION_PLACEHOLDER: 'Hallo, ich interessiere mich für...',
      PRIVACY_POLICY_1: "Ich habe die",
      PRIVACY_POLICY_COLOR: "Datenschutzrichtlinie",
      PRIVACY_POLICY_2: "gelesen und stimme der Verarbeitung meiner Daten wie beschrieben zu.",
      PRIVACY_ERROR: 'Bitte akzeptieren Sie die Datenschutzrichtlinie.',
      SUBMIT_BUTTON: 'Sag Hallo :)',
      FORM_NAME_ERROR: 'Bitte geben Sie einen gültigen Namen ein.',
      FORM_EMAIL_ERROR: 'Ungültiges E-Mail-Format.',
      FORM_MESSAGE_ERROR: 'Ihre Nachricht muss mindestens 15 Zeichen lang sein.',
      MAIL_SUCCESS: 'Die Nachricht wurde erfolgreich gesendet.',
    },
  };

  /** Injected HttpClient for making requests */
  http = inject(HttpClient);

  /** Model for contact form input */
  contactData = {
    name: '',
    email: '',
    message: '',
  };

  /** Whether the privacy policy is accepted */
  acceptTerms = false;

  /** Test mode toggle (e.g. prevents real mail submission) */
  mailTest = false;

  /** Controls display of success popup */
  showSuccessPopup = false;

  /** Request configuration for sending form data */
  post = {
    endPoint: 'https://philipp-schoenborn.de/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };

  /**
   * Creates an instance of ContactComponent.
   * @param languageService Service for managing current language
   * @param dialogService Service for showing dialogs (not used in current code)
   */
  constructor(
    private languageService: LanguageService,
    private dialogService: DialogService
  ) { }

  /**
   * Initializes the component, subscribing to language changes.
   */
  ngOnInit(): void {
    this.languageService.language$.subscribe((lang) => {
      this.selectedLanguage = lang;
    });
  }

  /**
   * Updates the currently selected language.
   * @param language Language to set ('EN' or 'DE')
   */
  setLanguage(language: 'EN' | 'DE') {
    this.languageService.setLanguage(language);
    const currentUrl = this.router.url.split('?')[0];
    const newUrl = `/${language}${currentUrl}`;
    this.router.navigateByUrl(newUrl);
  }

  /**
   * Handles contact form submission.
   * Sends data if form is valid and not in test mode.
   * Displays success popup and resets form.
   * @param contactForm The Angular NgForm instance
   */
  onSubmit(contactForm: NgForm) {
    if (contactForm.submitted && contactForm.form.valid && !this.mailTest) {
      this.http
        .post(
          this.post.endPoint,
          this.post.body(this.contactData),
          this.post.options
        )
        .subscribe({
          next: (response) => {
            // console.log('Response', response);
            contactForm.resetForm();
            this.displaySuccessPopup();
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => console.info('send post complete'),
        });
    } else if (contactForm.submitted && contactForm.form.valid && this.mailTest) {
      // console.log('mailTest=true. Skipping request. Resetting form...');
      contactForm.resetForm();
      this.displaySuccessPopup();
    } else {
      // console.log('Form is invalid or not yet submitted');
    }
  }

  /**
   * Displays a temporary success popup for 3 seconds.
   */
  displaySuccessPopup() {
    this.showSuccessPopup = true;
    setTimeout(() => {
      this.showSuccessPopup = false;
    }, 3000);
  }

  /**
   * Navigates to the legal notice/data protection page.
   * @param event MouseEvent from the link click
   */
  openDataProtection(event: MouseEvent): void {
    event.preventDefault();
    this.router.navigate(['/legal-notice']);
  }

}
