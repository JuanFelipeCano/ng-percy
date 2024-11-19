import { APP_INITIALIZER, EnvironmentProviders, Provider } from '@angular/core';

/**
 * @description Set configuration for Percy library
 * @returns Array<Provider | EnvironmentProviders>
 */
export const withPercy = (): Array<Provider | EnvironmentProviders> => {
  return [
      {
      provide: APP_INITIALIZER,
      useFactory: setPercyTheme,
      deps: [],
      multi: true,
    },
  ];
};

/**
 * @description Set theme for Percy library
 */
function setPercyTheme(): () => Promise<void> {
  return () => {
    return new Promise<void>((resolve) => {

      function setTheme(): void {
        const colorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark' : 'light';

        document.querySelector('body')!.className = 'light';
      }

      setTheme();

      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        setTheme();
      });

      resolve();
    });
  };
}
