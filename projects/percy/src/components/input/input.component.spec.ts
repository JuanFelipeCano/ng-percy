import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PercyInputComponent } from './input.component';

describe('PercyInputComponent', () => {
  let component: PercyInputComponent;
  let fixture: ComponentFixture<PercyInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PercyInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PercyInputComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('label', '');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
