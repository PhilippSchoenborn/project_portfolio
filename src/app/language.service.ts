import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    private languageSubject = new BehaviorSubject<'EN' | 'DE'>('EN');
    language$ = this.languageSubject.asObservable();
  
    setLanguage(lang: 'EN' | 'DE'): void {
      this.languageSubject.next(lang);
    }
}
