import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PercyToastComponent } from './toast.component';

describe('PercyToastComponent', () => {
  let component: PercyToastComponent;
  let fixture: ComponentFixture<PercyToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PercyToastComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PercyToastComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('message', 'label');
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
