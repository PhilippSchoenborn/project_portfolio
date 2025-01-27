import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private dataProtectionTrigger = new Subject<void>();

  // Observable to listen for data protection dialog triggers
  dataProtectionTrigger$ = this.dataProtectionTrigger.asObservable();

  // Method to trigger the data protection dialog
  openDataProtection() {
    this.dataProtectionTrigger.next();
  }
}
