import {
  ApplicationRef,
  ComponentRef,
  EmbeddedViewRef,
  inject,
  Injectable,
  signal,
  ViewContainerRef,
} from '@angular/core';
import { ZERO } from '../../constants';
import { sleep } from '../../utils';
import { PercyToast } from './models/toast.model';
import { PercyToastComponent } from './toast.component';

const DEFAULT_DURATION = 3000;

@Injectable()
export class PercyToastController {

  private toastRef!: ComponentRef<PercyToastComponent> | null;
  private readonly _viewContainerRef = inject(ViewContainerRef);
  private readonly _appRef = inject(ApplicationRef);

  public show(props: PercyToast): void {
    this.open(props);
  }

  public success(props: Omit<PercyToast, 'type'>): void {
    this.open({ ...props, type: 'success' });
  }

  public info(props: Omit<PercyToast, 'type'>): void {
    this.open({ ...props, type: 'info' });
  }

  public warning(props: Omit<PercyToast, 'type'>): void {
    this.open({ ...props, type: 'warning' });
  }

  public error(props: Omit<PercyToast, 'type'>): void {
    this.open({ ...props, type: 'error' });
  }

  private async open(props: PercyToast): Promise<void> {
    this.destroy();

    this.toastRef = this._viewContainerRef.createComponent(PercyToastComponent);

    this.setComponentProperties(props);

    document.querySelector('app-root')?.appendChild(
      (this.toastRef.hostView as EmbeddedViewRef<unknown>).rootNodes[ZERO]
    );

    await sleep(props.duration ?? DEFAULT_DURATION);
    await this.toastRef?.instance.close();
    this.destroy();
  }

  private setComponentProperties(props: PercyToast) {
    if (!this.toastRef) return;

    const componentInstance = this.toastRef.instance;
    const componentProps = {
      message: signal(props.message),
      type: signal(props.type ?? 'default'),
      description: signal(props.description),
      icon: signal(props.icon),
      shape: signal(props.shape ?? 'round'),
      position: props.position ?? 'bottom-right',
      a11yTypeDescription: signal(props.a11yTypeDescription ?? ''),
    };

    Object.assign(componentInstance, componentProps);
  }

  private destroy() {
    if (this.toastRef) {
      this._appRef.detachView(this.toastRef.hostView);
      this.toastRef.destroy();
      this.toastRef = null;
    }
  }
}
