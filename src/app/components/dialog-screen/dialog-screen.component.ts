import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ComponentRef, CUSTOM_ELEMENTS_SCHEMA, effect, ElementRef, HostListener, inject, model, OnInit, output, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { ScreenSizeDetectionService } from '../../services';
import { DialogScreenOptions } from './models';

const ANIMATION_TIME = 500;
const BREAKPOINT = 640;

@Component({
  selector: 'app-dialog-screen',
  standalone: true,
  imports: [ CommonModule ],
  providers: [ ScreenSizeDetectionService ],
  templateUrl: './dialog-screen.component.html',
  styleUrl: './dialog-screen.component.scss',
  host: { 'class': 'dialog-screen' },
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  animations: [
    trigger('dialog-screen-animation', [
      state('void', style({ opacity: 0 })),
      state('desktop', style({ opacity: 1 })),
      state('mobile', style({ transform: 'translateY(0)' })),
      transition('void => desktop', [
        animate('300ms ease-out', style({ opacity: 1 })),
      ]),
      transition('desktop => void', [
        animate('300ms ease-in', style({ opacity: 0 }))
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
export class DialogScreenComponent implements DialogScreenOptions, AfterViewInit {

    @ViewChild('content')
    public dialogContent!: ElementRef;

    @ViewChild('container', { read: ViewContainerRef })
    public container!: ViewContainerRef;

    @ViewChild('dragHandle')
    public dragHandle!: ElementRef;

  public component = model<any>();
  public componentProps = model<any>();
  public dismiss = output<any>();

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
    this.isMobile = document.body.getBoundingClientRect().width < BREAKPOINT;
    this.currentTranslateY = 0;
    this.isDragging = false;
    this.isVisible = true;

    effect(() => {
      this.isMobile = !this._screenSizeDetectionService.isGreaterOrEqualTo(BREAKPOINT);
    });
  }

  public ngAfterViewInit(): void {
    this.initComponent();
  }

  public close() {
    this.isVisible = false;
    this.resetDragState();
    setTimeout(() => this.dismiss.emit(null), ANIMATION_TIME);
  }

  private initComponent() {
    this.container.clear();
    const componentRef: ComponentRef<any> = this.container.createComponent(this.component());

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
    const focusableElements = this.dialogContent.nativeElement.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    firstFocusableElement.focus();

    this.dialogContent.nativeElement.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstFocusableElement) {
          e.preventDefault();
          lastFocusableElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastFocusableElement) {
          e.preventDefault();
          firstFocusableElement.focus();
        }
      }
    });
  }

  protected onTouchStart(event: TouchEvent) {
    if (!this.isMobile || !this.isVisible) return;

    if (event.target === this.dragHandle.nativeElement) {
      this.isDragging = true;
      this.startY = event.touches[0].clientY;
      this.startTranslateY = this.currentTranslateY;
      this._renderer.setStyle(this.dialogContent.nativeElement, 'transition', 'none');
      event.preventDefault();
    }
  }

  protected onTouchMove(event: TouchEvent) {
    if (!this.isMobile || !this.isVisible || !this.isDragging) return;

    const currentY = event.touches[0].clientY;
    const deltaY = currentY - this.startY;
    this.currentTranslateY = Math.max(this.startTranslateY + deltaY, 0);
    this._renderer.setStyle(this.dialogContent.nativeElement, 'transform', `translateY(${this.currentTranslateY}px)`);
    event.preventDefault();
  }

  protected onTouchEnd(event: TouchEvent) {
    if (!this.isMobile || !this.isVisible || !this.isDragging) return;

    this.isDragging = false;
    this._renderer.removeStyle(this.dialogContent.nativeElement, 'transition');

    if (this.currentTranslateY > this.dialogContent.nativeElement.clientHeight * 0.8) {
      this.close();
    } else {
      this.resetPosition();
    }
    event.preventDefault();
  }

  private resetPosition() {
    this.currentTranslateY = 0;
    this._renderer.setStyle(this.dialogContent.nativeElement, 'transform', 'translateY(0)');
  }

  private resetDragState() {
    this.isDragging = false;
    this.currentTranslateY = 0;
    this.startY = 0;
    this.startTranslateY = 0;
  }
}
