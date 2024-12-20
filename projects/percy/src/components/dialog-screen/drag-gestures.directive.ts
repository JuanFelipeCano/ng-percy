import {
  Directive,
  ElementRef,
  Host,
  HostListener,
  inject,
  OnDestroy,
  Renderer2,
} from '@angular/core';
import { ZERO } from '../../constants';
import { PercyDialogScreenComponent } from './dialog-screen.component';

@Directive({
  selector: '[percyDragGestures]',
  standalone: true,
})
export class PercyDragGesturesDirective implements OnDestroy {

  private startY!: number;
  private startTranslateY!: number;
  private currentTranslateY!: number;
  private isDragging!: boolean;

  @Host()
  private readonly _dialogScreen = inject(PercyDialogScreenComponent);
  private readonly _elementRef = inject(ElementRef<HTMLElement>);
  private readonly _renderer = inject(Renderer2);

  constructor() {
    this.currentTranslateY = 0;
    this.isDragging = false;
  }

  private get dialogContainerElement(): HTMLElement {
    return this._dialogScreen.dialogContainer().nativeElement;
  }

  public ngOnDestroy(): void {
    this.resetDragState();
  }

  @HostListener('touchstart', ['$event'])
  public onTouchStart(event: TouchEvent) {
    if (!this._dialogScreen.isMobile || !this._dialogScreen.isVisible) return;

    if (event.target === this._elementRef.nativeElement) {
      this.isDragging = true;
      this.startY = event.touches[ZERO].clientY;
      this.startTranslateY = this.currentTranslateY;

      this._renderer.setStyle(
        this.dialogContainerElement, 'transition', 'none'
      );

      event.preventDefault();
    }
  }

  @HostListener('touchmove', ['$event'])
  public onTouchMove(event: TouchEvent) {
    if (
      !this._dialogScreen.isMobile ||
      !this._dialogScreen.isVisible ||
      !this.isDragging
    ) return;

    const currentY = event.touches[ZERO].clientY;
    const deltaY = currentY - this.startY;
    this.currentTranslateY = Math.max(this.startTranslateY + deltaY, ZERO);

    this._renderer.setStyle(
      this.dialogContainerElement, 'transform', `translateY(${ this.currentTranslateY }px)`
    );

    event.preventDefault();
  }

  @HostListener('touchend', ['$event'])
  public onTouchEnd(event: TouchEvent) {
    if (
      !this._dialogScreen.isMobile ||
      !this._dialogScreen.isVisible ||
      !this.isDragging
    ) return;

    this.isDragging = false;
    this._renderer.removeStyle(this.dialogContainerElement, 'transition');

    if (this.currentTranslateY > this.dialogContainerElement.clientHeight * 0.8) {
      this._dialogScreen.close();
    } else {
      this.resetPosition();
    }

    event.preventDefault();
  }

  private resetPosition() {
    this.currentTranslateY = ZERO;

    this._renderer.setStyle(
      this.dialogContainerElement, 'transform', 'translateY(0)'
    );
  }

  private resetDragState() {
    this.isDragging = false;
    this.currentTranslateY = ZERO;
    this.startY = ZERO;
    this.startTranslateY = ZERO;
  }
}
