import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PercyComponent } from './percy.component';

describe('PercyComponent', () => {
  let component: PercyComponent;
  let fixture: ComponentFixture<PercyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PercyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PercyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
