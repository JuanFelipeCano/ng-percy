import { APP_INITIALIZER, EnvironmentProviders, Provider } from '@angular/core';
import { PercyConfig } from './config.model';
import { PERCY_CONFIG, PERCY_PREFERRED_THEME } from './injection-tokens';

/**
 * @description Set configuration for Percy library
 * @returns Array<Provider | EnvironmentProviders>
 */
export const providePercy = (config?: PercyConfig): Array<Provider | EnvironmentProviders> => {
  return [
    {
      provide: PERCY_CONFIG,
      useValue: config,
    },
    {
      provide: PERCY_PREFERRED_THEME,
      useValue: config?.theme,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: setPercyTheme,
      deps: [ PERCY_PREFERRED_THEME ],
      multi: true,
    },
  ];
};

/**
 * @description Set theme for Percy library
 */
function setPercyTheme(preferredTheme?: string): () => Promise<void> {
  return () => {
    return new Promise<void>((resolve) => {

      function setTheme(): void {
        const colorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark' : 'light';

        document.querySelector('body')!.className = preferredTheme ?? colorScheme;
      }

      setTheme();

      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        setTheme();
      });

      resolve();
    });
  };
}
