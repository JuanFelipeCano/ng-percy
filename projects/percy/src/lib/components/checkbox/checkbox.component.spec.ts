import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PercyCheckboxComponent } from './checkbox.component';

describe('PercyCheckboxComponent', () => {
  let component: PercyCheckboxComponent;
  let fixture: ComponentFixture<PercyCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PercyCheckboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PercyCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
