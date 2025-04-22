import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  /**
   * Asynchronous setup before each test case.
   * Configures the testing module and creates the component fixture.
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Unit test to verify that the component is successfully created.
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});