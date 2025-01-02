import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PercyDropdownComponent } from './dropdown.component';

describe('PercyDropdownComponent', () => {
  let component: PercyDropdownComponent;
  let fixture: ComponentFixture<PercyDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PercyDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PercyDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
