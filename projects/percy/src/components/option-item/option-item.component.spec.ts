import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PercyOptionItemComponent } from './option-item.component';
import { PercyDropdownListOption } from '../dropdown';

describe('PercyOptionItemComponent', () => {
  let component: PercyOptionItemComponent;
  let fixture: ComponentFixture<PercyOptionItemComponent>;

  const optionMock: PercyDropdownListOption = {
    text: '',
    value: '',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PercyOptionItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PercyOptionItemComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('option', optionMock);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
