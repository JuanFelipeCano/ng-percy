import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PercyDropdownListComponent } from './dropdown-list.component';
import { PercyFocusService, PercyKeyboardExecutorService } from '../../../../services';

const MockPercyFocusService = {
  setLastFocusedElement: jest.fn(),
  setFocusToLastFocusedElement: jest.fn(),
};

const MockPercyKeyboardExecutorService = {
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
        { provide: PercyFocusService, useValue: MockPercyFocusService },
        { provide: PercyKeyboardExecutorService, useValue: MockPercyKeyboardExecutorService },
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
