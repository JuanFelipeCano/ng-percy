import { Renderer2 } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { KeyboardKeys } from '../../constants';
import { PercyCheckboxComponent } from './checkbox.component';

describe('PercyCheckboxComponent', () => {
  let component: PercyCheckboxComponent;
  let fixture: ComponentFixture<PercyCheckboxComponent>;

  let checkbox: HTMLElement;
  let label: HTMLElement;
  let renderer: Renderer2;

  const expectedLabel = 'Check me';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PercyCheckboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PercyCheckboxComponent);
    component = fixture.componentInstance;

    checkbox = fixture.debugElement.query(By.css('[data-testid="percy-checkbox"]')).nativeElement;
    label = fixture.debugElement.query(By.css('[data-testid="percy-checkbox_label"]')).nativeElement;
    renderer = fixture.componentRef.injector.get(Renderer2);

    fixture.componentRef.setInput('label', expectedLabel);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should checkbox element have the correct label', () => {
    expect(component.label()).toBe(expectedLabel);
    expect(label.textContent).toContain(expectedLabel);
  });

  it('should checkbox element trigger percyClick when click event is called', () => {
    const spy = jest.spyOn(component.percyClick, 'emit');

    checkbox.click();

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('shoult checkbox element trigger percyBlur when blur event is called', () => {
    const spy = jest.spyOn(component.percyBlur, 'emit');

    checkbox.focus();
    checkbox.blur();

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('shoult checkbox element trigger percyFocus when focus event is called', () => {
    const spy = jest.spyOn(component.percyFocus, 'emit');

    checkbox.focus();

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('shoult checkbox element trigger percyChange when change event is called', () => {
    const spy = jest.spyOn(component.percyChange, 'emit');

    component.checked.set(true);

    const event = new Event('change');
    checkbox.dispatchEvent(event);

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(false);
  });

  describe('ControlValueAccessor tests', () => {
    it('should set chexbox true', () => {
      const spy = jest.spyOn(component, 'onChange');
      component.checked.set(false);

      component.writeValue(true);
      fixture.detectChanges();

      expect((checkbox as HTMLInputElement).checked).toBeTruthy();
      expect(spy).toHaveBeenCalledWith(true);
    });

    it('shoud set onChange', () => {
      const onChange = (_value: any) => {};
      component.registerOnChange(onChange);

      expect(component.onChange).toEqual(onChange);
    });

    it('shoud set onTouched', () => {
      const onTouched = () => {};
      component.registerOnTouched(onTouched);

      expect(component.onTouched).toEqual(onTouched);
    });
  });

  describe('A11y tests', () => {
    it('should set checked to false and execute percyChange with the correct value', () => {
      const spy = jest.spyOn(component.percyChange, 'emit');

      component.checked.set(true);

      const event = new KeyboardEvent('keydown', { key: KeyboardKeys.SPACE });
      renderer.listen(checkbox, 'keydown', () => component.onKeyDown(event));
      checkbox.dispatchEvent(event);

      expect(component.checked()).toBeFalsy();
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(false);
    });

    it('should not execute percyChange when checkbox is disabled', () => {
      const spy = jest.spyOn(component.percyChange, 'emit');

      fixture.componentRef.setInput('disabled', true);
      fixture.componentRef.setInput('readonly', false);
      fixture.detectChanges();

      const event = new KeyboardEvent('keydown', { key: KeyboardKeys.SPACE });
      renderer.listen(checkbox, 'keydown', () => component.onKeyDown(event));
      checkbox.dispatchEvent(event);

      expect(spy).not.toHaveBeenCalled();
    });

    it('should not execute percyChange when checkbox is readonly', () => {
      const spy = jest.spyOn(component.percyChange, 'emit');

      fixture.componentRef.setInput('disabled', false);
      fixture.componentRef.setInput('readonly', true);
      fixture.detectChanges();

      const event = new KeyboardEvent('keydown', { key: KeyboardKeys.SPACE });
      renderer.listen(checkbox, 'keydown', () => component.onKeyDown(event));
      checkbox.dispatchEvent(event);

      expect(spy).not.toHaveBeenCalled();
    });

    it('should not execute percyChange when keydown event is different to space key', () => {
      const spy = jest.spyOn(component.percyChange, 'emit');

      const event = new KeyboardEvent('keydown', { key: KeyboardKeys.SHIFT });
      renderer.listen(checkbox, 'keydown', () => component.onKeyDown(event));
      checkbox.dispatchEvent(event);

      expect(spy).not.toHaveBeenCalled();
    });
  });
});
