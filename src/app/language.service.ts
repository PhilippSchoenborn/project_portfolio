import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * LanguageService is responsible for managing and providing the current language setting for the application.
 * It uses a BehaviorSubject to track the selected language and allows components to subscribe to language changes.
 */
@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  /**
   * A private BehaviorSubject that holds the current language ('EN' or 'DE').
   * Initialized to 'EN' by default.
   */
  private languageSubject = new BehaviorSubject<'EN' | 'DE'>('EN');

  /**
   * An observable that components can subscribe to in order to get updates when the language changes.
   * This exposes the languageSubject as an observable.
   */
  language$ = this.languageSubject.asObservable();

  /**
   * Updates the current language.
   * @param { 'EN' | 'DE' } lang The new language to set. Can either be 'EN' for English or 'DE' for German.
   */
  setLanguage(lang: 'EN' | 'DE'): void {
    this.languageSubject.next(lang);
  }
}
