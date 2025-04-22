import { TestBed } from '@angular/core/testing';
import { DialogService } from './dialog.service';

/**
 * Unit tests for the DialogService.
 * These tests ensure that the DialogService behaves as expected.
 */
describe('DialogService', () => {
  let service: DialogService;

  /**
   * This function is called before each test to set up the testing environment.
   * It configures the testing module and injects the DialogService.
   */
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogService);
  });

  /**
   * Test case to check if the DialogService is created successfully.
   * It ensures that the DialogService instance is not null or undefined.
   */
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
