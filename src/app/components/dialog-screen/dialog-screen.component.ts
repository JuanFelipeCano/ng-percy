import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ComponentRef,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  ElementRef,
  HostListener,
  inject,
  model,
  OnDestroy,
  output,
  Renderer2,
  Type,
  viewChild,
  ViewContainerRef
} from '@angular/core';
import { ScreenSizeDetectionService } from '../../services';
import { DialogScreenRequiredOptions } from './models';

const ANIMATION_TIME = 500;
const MOBILE_BREAKPOINT = 640;

@Component({
  selector: 'app-dialog-screen',
  standalone: true,
  imports: [ CommonModule ],
  providers: [ ScreenSizeDetectionService ],
  templateUrl: './dialog-screen.component.html',
  styleUrl: './dialog-screen.component.scss',
  host: {
    'class': 'dialog-screen',
    '[class.screen-modal]': '!isMobile',
    '[class.screen-bottom-sheet]': 'isMobile',
  },
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  animations: [
    trigger('dialog-screen-animation', [
      state('void', style({ opacity: 0 })),
      state('desktop', style({ opacity: 1 })),
      state('mobile', style({ transform: 'translateY(0)' })),
      transition('void => desktop', [
        animate('200ms ease-out', style({ opacity: 1 })),
      ]),
      transition('desktop => void', [
        animate('200ms ease-in', style({ opacity: 0 }))
      ]),
      transition('void => mobile', [
        style({ transform: 'translateY(100%)', opacity: 1 }),
        animate('300ms ease-in-out', style({ transform: 'translateY(0)' }))
      ]),
      transition('mobile => void', [
        animate('500ms ease-out', style({ transform: 'translateY(100%)' }))
      ])
    ])
  ]
})
export class DialogScreenComponent implements DialogScreenRequiredOptions, AfterViewInit, OnDestroy {

  public readonly dialogContent = viewChild.required('content', { read: ViewContainerRef });
  public readonly dialogContainer = viewChild.required('container', { read: ElementRef });
  public readonly dragHandle = viewChild.required('dragHandle', { read: ElementRef });

  public readonly title = model.required<string>();
  public readonly component = model.required<Type<any>>();
  public readonly componentProps = model<{ [key: string]: any }>();
  public readonly closeFromBackground = model<boolean>(true);
  public readonly hideCloseButton = model<boolean>(false);
  public readonly hideTitle = model<boolean>(false);

  public readonly ariaDescribedBy = model<string>('');
  public readonly closeButtonAriaLabel = model<string>('');

  public readonly dismiss = output<any>();

  public isMobile!: boolean;
  public isVisible!: boolean;

  private startY!: number;
  private startTranslateY!: number;
  private currentTranslateY!: number;
  private isDragging!: boolean;

  private readonly _renderer = inject(Renderer2);
  private readonly _screenSizeDetectionService = inject(ScreenSizeDetectionService);

  constructor(
  ) {
    this.isMobile = document.body.getBoundingClientRect().width < MOBILE_BREAKPOINT;
    this.currentTranslateY = 0;
    this.isDragging = false;
    this.isVisible = true;

    effect(() => {
      this.isMobile = !this._screenSizeDetectionService.isGreaterOrEqualTo(MOBILE_BREAKPOINT);
    });
  }

  public ngAfterViewInit(): void {
    this.initComponent();
  }

  public ngOnDestroy(): void {
    this.resetDragState();
  }

  public close() {
    this.isVisible = false;
    setTimeout(() => this.dismiss.emit(null), ANIMATION_TIME);
  }

  private initComponent() {
    this.dialogContent().clear();
    const componentRef: ComponentRef<any>
      = this.dialogContent().createComponent(this.component());

    if (this.componentProps()) {
      Object.assign(componentRef.instance, this.componentProps());
    }

    componentRef.instance.dismiss = this.dismiss;

    this.trapFocus();
  }

  @HostListener('document:keydown.escape')
  public onEscapePressed() {
    this.close();
  }

  private trapFocus() {
    const focusableElements = this.dialogContainer().nativeElement.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusableElement = this.hideCloseButton() ? focusableElements[0] : focusableElements[1];
    const firstInteractiveElement = focusableElements[0];
    const lastInteractiveElement = focusableElements[focusableElements.length - 1];

    firstFocusableElement.focus();

    this.dialogContainer().nativeElement.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstInteractiveElement) {
          e.preventDefault();
          lastInteractiveElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastInteractiveElement) {
          e.preventDefault();
          firstInteractiveElement.focus();
        }
      }
    });
  }

  protected onTouchStart(event: TouchEvent) {
    if (!this.isMobile || !this.isVisible) return;

    if (event.target === this.dragHandle().nativeElement) {
      this.isDragging = true;
      this.startY = event.touches[0].clientY;
      this.startTranslateY = this.currentTranslateY;
      this._renderer.setStyle(this.dialogContainer().nativeElement, 'transition', 'none');
      event.preventDefault();
    }
  }

  protected onTouchMove(event: TouchEvent) {
    if (!this.isMobile || !this.isVisible || !this.isDragging) return;

    const currentY = event.touches[0].clientY;
    const deltaY = currentY - this.startY;
    this.currentTranslateY = Math.max(this.startTranslateY + deltaY, 0);
    this._renderer.setStyle(this.dialogContainer().nativeElement, 'transform', `translateY(${this.currentTranslateY}px)`);
    event.preventDefault();
  }

  protected onTouchEnd(event: TouchEvent) {
    if (!this.isMobile || !this.isVisible || !this.isDragging) return;

    this.isDragging = false;
    this._renderer.removeStyle(this.dialogContainer().nativeElement, 'transition');

    if (this.currentTranslateY > this.dialogContainer().nativeElement.clientHeight * 0.8) {
      this.close();
    } else {
      this.resetPosition();
    }
    event.preventDefault();
  }

  private resetPosition() {
    this.currentTranslateY = 0;
    this._renderer.setStyle(this.dialogContainer().nativeElement, 'transform', 'translateY(0)');
  }

  private resetDragState() {
    this.isDragging = false;
    this.currentTranslateY = 0;
    this.startY = 0;
    this.startTranslateY = 0;
  }
}
