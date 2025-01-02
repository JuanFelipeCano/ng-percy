import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PercyDropdownListComponent } from './dropdown-list.component';
import { FocusService, KeyboardExecutorService } from '../../../../services';

const MockFocusService = {
  setLastFocusedElement: jest.fn(),
  setFocusToLastFocusedElement: jest.fn(),
};

const MockKeyboardExecutorService = {
  execute: jest.fn(),
};

describe('PercyDropdownListComponent', () => {
  let component: PercyDropdownListComponent;
  let fixture: ComponentFixture<PercyDropdownListComponent>;

  const expectedLabel = 'Check me';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PercyDropdownListComponent ],
      providers: [
        { provide: FocusService, useValue: MockFocusService },
        { provide: KeyboardExecutorService, useValue: MockKeyboardExecutorService },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PercyDropdownListComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('label', expectedLabel);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
