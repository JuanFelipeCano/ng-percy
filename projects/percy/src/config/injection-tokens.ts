import { InjectionToken } from '@angular/core';
import { PercyConfig } from './config.model';

export const PERCY_CONFIG = new InjectionToken<PercyConfig>('PercyConfig');
export const PERCY_PREFERRED_THEME = new InjectionToken<PercyConfig>('PercyPreferredTheme');
