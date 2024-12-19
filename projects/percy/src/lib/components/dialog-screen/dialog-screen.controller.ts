import {
  ApplicationRef,
  ComponentRef,
  EmbeddedViewRef,
  inject,
  Injectable,
  ModelSignal,
  ViewContainerRef,
} from '@angular/core';
import { defer, Observable, Subject } from 'rxjs';
import { ZERO } from '../../constants';
import { PercyDialogScreenComponent } from './dialog-screen.component';
import { PercyDialogScreenOptions } from './models';

@Injectable()
export class PercyDialogScreenController {

  private dialogScreenRef!: ComponentRef<PercyDialogScreenComponent<unknown>> | null;
  private subject!: Subject<unknown>;

  private readonly _viewContainerRef = inject(ViewContainerRef);
  private readonly _appRef = inject(ApplicationRef);

  /**
   * @description Create a dialog screen
   * The dialog screen will be appended to the body.
   * The dialog screen will be destroyed when the observable is completed.
   * The observable will emit the result of the dialog screen,
   * it can be passed to the `DialogScreenController.close` method.
   * @param options - Dialog screen options
   * @generic T - Component props type
   * @returns Observable<unknown>
   */
  public create<T = unknown>(options: PercyDialogScreenOptions<T>): Observable<unknown> {
    this.close();

    this.subject = new Subject();

    return defer(() => {
      document.body.style.overflow = 'hidden';

      this.dialogScreenRef = this._viewContainerRef.createComponent(PercyDialogScreenComponent);

      this.setComponentProperties(options);

      document.body.appendChild((this.dialogScreenRef.hostView as EmbeddedViewRef<unknown>).rootNodes[ZERO]);

      return this.subject.asObservable();
    });
  }

  /**
   * @description Close the dialog screen
   * @param result - Result of the dialog screen
   */
  public close<T = unknown>(result?: T) {
    if (this.dialogScreenRef) {
      document.body.style.overflow = 'auto';

      this.subject.next(result);
      this.subject.complete();
      this._appRef.detachView(this.dialogScreenRef.hostView);
      this.dialogScreenRef.destroy();
      this.dialogScreenRef = null;
    }
  }

  /**
   * @description Set the properties of the dialog screen
   * @param options - Dialog screen options
   */
  private setComponentProperties<T = unknown>(options: PercyDialogScreenOptions<T>) {
    if (!this.dialogScreenRef) return;

    const componentInstance = this.dialogScreenRef.instance;

    for (const key in options) {
      const typedKey = key as keyof PercyDialogScreenOptions<T>;

      if (typedKey in componentInstance) {
        const property = (componentInstance as any)[typedKey];
        const isPropertySignal = property && typeof property === 'function' && 'set' in property;

        isPropertySignal && (property as ModelSignal<unknown>).set(options[typedKey]);
        !isPropertySignal && ((componentInstance as any)[typedKey] = options[typedKey]);
      }
    }

    componentInstance.dismiss.subscribe((result: unknown) => this.close(result));
  }
}
