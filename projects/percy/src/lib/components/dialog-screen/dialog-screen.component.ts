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
  Type,
  viewChild,
  ViewContainerRef
} from '@angular/core';
import { Subject } from 'rxjs';
import { TrapFocusDirective } from '../../directives';
import { ScreenSizeDetectionService } from '../../services';
import { sleep } from '../../utils';
import { DIALOG_SCREEN_ANIMATION } from './dialog-screen.animation';
import { DragGesturesDirective } from './drag-gestures.directive';
import { DialogScreenRequiredOptions } from './models';

const ANIMATION_TIME = 500;
const MOBILE_BREAKPOINT = 640;

@Component({
  selector: 'percy-dialog-screen',
  standalone: true,
  imports: [ CommonModule, TrapFocusDirective, DragGesturesDirective ],
  providers: [ ScreenSizeDetectionService ],
  templateUrl: './dialog-screen.component.html',
  styleUrl: './dialog-screen.component.scss',
  host: {
    'class': 'dialog-screen',
    '[class.screen-modal]': '!isMobile',
    '[class.screen-bottom-sheet]': 'isMobile',
  },
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  animations: [ DIALOG_SCREEN_ANIMATION ],
})
export class DialogScreenComponent<T> implements DialogScreenRequiredOptions<T>, AfterViewInit, OnDestroy {

  public readonly dialogContent = viewChild.required('content', { read: ViewContainerRef });
  public readonly dialogContainer = viewChild.required('container', { read: ElementRef });

  public readonly title = model.required<string>();
  public readonly component = model.required<Type<any>>();
  public readonly componentProps = model< T | { [key: string]: any }>();
  public readonly closeFromBackground = model<boolean>(true);
  public readonly hideCloseButton = model<boolean>(false);
  public readonly hideTitle = model<boolean>(false);

  /**
   * A11y properties
   */
  public readonly a11yAriaDescribedBy = model<string | null>(null);
  public readonly a11yCloseButtonAriaLabel = model<string | null>(null);

  public readonly dismiss = output<any>();

  public isMobile!: boolean;
  public isVisible!: boolean;
  private readonly destroyed$ = new Subject<void>();

  private readonly _screenSizeDetectionService = inject(ScreenSizeDetectionService);

  constructor(
  ) {
    this.isMobile = document.body.getBoundingClientRect().width < MOBILE_BREAKPOINT;
    this.isVisible = true;

    effect(() => {
      this.isMobile = !this._screenSizeDetectionService.isGreaterOrEqualTo(MOBILE_BREAKPOINT);
    });
  }

  public ngAfterViewInit(): void {
    this.initComponent();
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public async close() {
    this.isVisible = false;

    await sleep(ANIMATION_TIME);

    // TODO: Fix this
    // isStopped is deprecated in v8, but we need to use it to avoid the error
    // closed is always false
    (!this.destroyed$.isStopped && !this.destroyed$.closed) && this.dismiss.emit(null);
  }

  private initComponent() {
    this.dialogContent().clear();

    const componentRef: ComponentRef<any>
      = this.dialogContent().createComponent(this.component());

    this.setComponentProperties(componentRef);
  }

  private setComponentProperties(componentRef: ComponentRef<any>) {
    if (this.componentProps()) {
      Object.assign(componentRef.instance, this.componentProps());
    }

    componentRef.instance.dismiss = this.dismiss;
  }

  @HostListener('document:keydown.escape')
  public onEscapePressed() {
    this.close();
  }
}
