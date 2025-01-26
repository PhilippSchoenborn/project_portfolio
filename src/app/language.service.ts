import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    // Start with English by default
    private languageSubject = new BehaviorSubject<'EN' | 'DE'>('EN');

    // Expose the subject as an observable so components can subscribe
    language$ = this.languageSubject.asObservable();

    // Method to update the language
    setLanguage(lang: 'EN' | 'DE') {
        this.languageSubject.next(lang);
    }
}
