import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PercyDatePickerInputComponent } from './date-picker-input.component';

describe('PercyDatePickerInputComponent', () => {
  let component: PercyDatePickerInputComponent;
  let fixture: ComponentFixture<PercyDatePickerInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PercyDatePickerInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PercyDatePickerInputComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('label', '');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
