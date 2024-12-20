import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PercyButtonComponent } from './button.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('PercyButtonComponent', () => {
  let component: PercyButtonComponent;
  let fixture: ComponentFixture<PercyButtonComponent>;

  let buttonDe: DebugElement;
  let button: HTMLElement;
  let labelDe: DebugElement;
  let label: HTMLElement;

  const expectedLabel = 'Click me';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PercyButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PercyButtonComponent);
    component = fixture.componentInstance;

    buttonDe = fixture.debugElement.query(By.css('[data-testid="percy-button"]'));
    button = buttonDe.nativeElement;

    labelDe = fixture.debugElement.query(By.css('[data-testid="percy-button_label"]'));
    label = labelDe.nativeElement;

    fixture.componentRef.setInput('label', expectedLabel);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should button element have the correct label', () => {
    expect(component.label()).toBe(expectedLabel);
    expect(label.textContent).toContain(expectedLabel);
  });

  it('should button element trigger percyClick when click event is called', () => {
    const spy = jest.spyOn(component.percyClick, 'emit');

    button.click();

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('shoult button element trigger percyBlur when blur event is called', () => {
    const spy = jest.spyOn(component.percyBlur, 'emit');

    button.focus();
    button.blur();

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);

  });

  it('shoult button element trigger percyFocus when focus event is called', () => {
    const spy = jest.spyOn(component.percyFocus, 'emit');

    button.focus();

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);

  });
});
