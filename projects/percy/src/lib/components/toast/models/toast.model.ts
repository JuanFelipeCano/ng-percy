import { ToastPosition, ToastShape, ToastType } from '../types';

export interface Toast {
  message: string;
  position?: ToastPosition;
  type?: ToastType;
  description?: string;
  icon?: string;
  shape?: ToastShape;
  duration?: number;
  a11yTypeDescription?: string;
}
