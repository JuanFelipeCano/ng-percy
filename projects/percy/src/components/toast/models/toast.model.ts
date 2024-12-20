import { PercyToastShape, ToastPosition, ToastType } from '../types';

export interface PercyToast {
  message: string;
  position?: ToastPosition;
  type?: ToastType;
  description?: string;
  icon?: string;
  shape?: PercyToastShape;
  duration?: number;
  a11yTypeDescription?: string;
}
