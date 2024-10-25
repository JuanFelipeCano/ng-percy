import { ModelSignal, Type } from '@angular/core';

/**
 * @name DialogScreenOptions
 * @description Defines the options for the dialog screen
 * @param title - Title of the dialog
 * @param component - Component to be displayed in the dialog
 * @param componentProps - Props to be passed to the displayed component
 * @param closeFromBackground - Whether the dialog can be closed by clicking outside of it - true by default
 * @param hideCloseButton - Whether the close button is hidden - false by default
 * @param hideTitle - Whether the title is hidden - false by default
 * @param a11yAriaDescribedBy - A11y - Id of the element that describes the dialog - empty by default
 * @param a11yCloseButtonAriaLabel - A11y - Label of the close button - empty by default
 *
 * Although the title is required, the property hideTitle can be used to hide the title.
 * It is required because of the accesibility. The dialog screen will use the title as the aria-labelledby attribute.
 */
export interface DialogScreenOptions<T> {
  title: string;
  component: Type<any>;
  componentProps?: T | { [key: string]: any };
  // TODO: Implement events
  // componentEvents?: { [key: string]: Function };
  closeFromBackground?: boolean;
  hideCloseButton?: boolean;
  hideTitle?: boolean;
  a11yAriaDescribedBy?: string;
  a11yCloseButtonAriaLabel?: string;
}

/**
 * @name DialogScreenRequiredOptions
 * @description It constains required options to be implemented in the dialog screen.
 * The typos are ModelSignals of the types defined in the DialogScreenOptions interface.
 */
export interface DialogScreenRequiredOptions<T> {
  title: ModelSignal<string>;
  component:  ModelSignal<Type<any>>;
  componentProps: ModelSignal< T | { [key: string]: any; } | undefined>;
  // TODO: Implement events
  // componentEvents: { [key: string]: Function };
  closeFromBackground: ModelSignal<boolean>;
  hideCloseButton: ModelSignal<boolean>;
  hideTitle: ModelSignal<boolean>;
  a11yAriaDescribedBy: ModelSignal<string | null>;
  a11yCloseButtonAriaLabel: ModelSignal<string | null>;
};
