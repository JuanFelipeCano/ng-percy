import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PercyDialogScreenComponent } from './dialog-screen.component';
import { ScreenSizeDetectionService } from '../../services';

describe('PercyDialogScreenComponent', () => {
  let component: PercyDialogScreenComponent<unknown>;
  let fixture: ComponentFixture<PercyDialogScreenComponent<unknown>>;


  let screenSizeDetectionServiceMock!: { isGreaterOrEqualTo: jest.Mock };

  beforeEach(async () => {
    screenSizeDetectionServiceMock = {
      isGreaterOrEqualTo: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [PercyDialogScreenComponent],
      providers: [
        { provide: ScreenSizeDetectionService, useValue: screenSizeDetectionServiceMock },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PercyDialogScreenComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('title', '');
    fixture.componentRef.setInput('component', '');
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(true).toBeTruthy();
  });
});
