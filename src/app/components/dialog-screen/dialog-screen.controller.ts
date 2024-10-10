import { ApplicationRef, ComponentRef, EmbeddedViewRef, inject, Injectable, ViewContainerRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DialogScreenComponent } from './dialog-screen.component';
import { DialogScreenOptions } from './models';

@Injectable()
export class DialogScreenController {

  private dialogScreenRef!: ComponentRef<DialogScreenComponent> | null;
  private subject!: Subject<any>;

  private readonly _viewContainerRef = inject(ViewContainerRef);
  private readonly _appRef = inject(ApplicationRef);

  public create(options: DialogScreenOptions): Observable<any> {
    this.close();

    this.subject = new Subject();
    this.dialogScreenRef = this._viewContainerRef.createComponent(DialogScreenComponent);

    this.setComponentProperties(options);

    document.body.appendChild((this.dialogScreenRef.hostView as EmbeddedViewRef<any>).rootNodes[0]);
    return this.subject.asObservable();
  }

  public close(result?: unknown) {
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

    this.dialogScreenRef.instance.component.set(options.component);
    this.dialogScreenRef.instance.componentProps.set(options.componentProps);

    this.dialogScreenRef.instance.dismiss.subscribe((result: unknown) => this.close(result));
  }
}
