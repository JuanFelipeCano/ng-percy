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
 * @param ariaDescribedBy - A11y - Id of the element that describes the dialog - empty by default
 * @param closeButtonAriaLabel - A11y - Label of the close button - empty by default
 */
export interface DialogScreenOptions {
  title: string;
  component: Type<any>;
  componentProps?: { [key: string]: any };
  // componentEvents?: { [key: string]: Function }; // TODO: Implement events
  closeFromBackground?: boolean;
  hideCloseButton?: boolean;
  hideTitle?: boolean;
  ariaDescribedBy?: string;
  closeButtonAriaLabel?: string;
}

/**
 * @name DialogScreenRequiredOptions
 * @description It constains required options to be implemented in the dialog screen.
 * The typos are ModelSignals of the types defined in the DialogScreenOptions interface.
 */
export interface DialogScreenRequiredOptions {
  title: ModelSignal<string>;
  component:  ModelSignal<Type<any>>;
  componentProps: ModelSignal<{ [key: string]: any; } | undefined>;
  // componentEvents: { [key: string]: Function }; // TODO: Implement events
  closeFromBackground: ModelSignal<boolean>;
  hideCloseButton: ModelSignal<boolean>;
  hideTitle: ModelSignal<boolean>;
  ariaDescribedBy: ModelSignal<string>;
  closeButtonAriaLabel: ModelSignal<string>;
};
