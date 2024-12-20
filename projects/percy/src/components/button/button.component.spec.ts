import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PercyButtonComponent } from './button.component';

describe('PercyButtonComponent', () => {
  let component: PercyButtonComponent;
  let fixture: ComponentFixture<PercyButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PercyButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PercyButtonComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'Click me');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
