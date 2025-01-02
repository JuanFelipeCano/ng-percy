import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PercyDatePickerComponent } from './date-picker.component';

describe('PercyDatePickerComponent', () => {
  let component: PercyDatePickerComponent;
  let fixture: ComponentFixture<PercyDatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PercyDatePickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PercyDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
