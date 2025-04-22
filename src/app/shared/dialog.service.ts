import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Service for handling dialog interactions, specifically triggering the display of the data protection dialog.
 * The service provides methods to open the data protection dialog and observe when it should be shown.
 */
@Injectable({
  providedIn: 'root', // The service is provided at the root level, making it a singleton in the application.
})
export class DialogService {
  // Private Subject to trigger the data protection dialog
  private dataProtectionTrigger = new Subject<void>();

  /**
   * Observable that components can subscribe to in order to be notified when the data protection dialog should be opened.
   */
  dataProtectionTrigger$ = this.dataProtectionTrigger.asObservable();

  /**
   * Triggers the data protection dialog by emitting a value to the dataProtectionTrigger Subject.
   * Components can listen to this to open the data protection dialog.
   */
  openDataProtection() {
    this.dataProtectionTrigger.next(); // Emit a value to notify subscribers to open the data protection dialog.
  }
}
