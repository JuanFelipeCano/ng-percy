import { ElementRef, Renderer2 } from '@angular/core';
import { PercyDragGesturesDirective } from './drag-gestures.directive';

describe('PercyDragGesturesDirective', () => {
  let service: PercyDragGesturesDirective;

  let percyDialogScreenComponentMock!: {
    dialogContainer: jest.Mock,
    close: jest.Mock,
    isMobile: boolean,
    isVisible: boolean,
  };

  let elementRefMock!: ElementRef;

  let renderer2Mock!: Renderer2;

  beforeEach(() => {
    percyDialogScreenComponentMock = {
      dialogContainer: jest.fn(),
      close: jest.fn(),
      isMobile: true,
      isVisible: true,
    };

    service = new PercyDragGesturesDirective(
      percyDialogScreenComponentMock as any,
      elementRefMock,
      renderer2Mock
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
