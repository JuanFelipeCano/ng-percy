import { ApplicationRef, ComponentRef, EmbeddedViewRef, inject, Injectable, ModelSignal, ViewContainerRef } from '@angular/core';
import { defer, Observable, Subject } from 'rxjs';
import { DialogScreenComponent } from './dialog-screen.component';
import { DialogScreenOptions } from './models';

@Injectable()
export class DialogScreenController {

  private dialogScreenRef!: ComponentRef<DialogScreenComponent> | null;
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
   * @returns Observable<unknown>
   */
  public create(options: DialogScreenOptions): Observable<unknown> {
    this.close();

    this.subject = new Subject();

    return defer(() => {
      this.dialogScreenRef = this._viewContainerRef.createComponent(DialogScreenComponent);

      this.setComponentProperties(options);

      document.body.appendChild((this.dialogScreenRef.hostView as EmbeddedViewRef<unknown>).rootNodes[0]);

      return this.subject.asObservable();
    });
  }

  /**
   * @description Close the dialog screen
   * @param result - Result of the dialog screen
   */
  public close<T = unknown>(result?: T) {
    if (this.dialogScreenRef) {
      this.subject.next(result);
      this.subject.complete();
      this._appRef.detachView(this.dialogScreenRef.hostView);
      this.dialogScreenRef.destroy();
      this.dialogScreenRef = null;
    }
  }

  private setComponentProperties(options: DialogScreenOptions) {
    if (!this.dialogScreenRef) return;

    const componentInstance = this.dialogScreenRef.instance;

    for (const key in options) {
      const typedKey = key as keyof DialogScreenOptions;

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
