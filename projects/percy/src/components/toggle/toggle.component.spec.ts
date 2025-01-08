import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PercyToggleComponent } from './toggle.component';

describe('PercyToggleComponent', () => {
  let component: PercyToggleComponent;
  let fixture: ComponentFixture<PercyToggleComponent>;

  const expectedLabel = 'Click me';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PercyToggleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PercyToggleComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('label', expectedLabel);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
