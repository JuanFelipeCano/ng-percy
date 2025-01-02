
import { ScreenSizeDetectionService } from './screen-size-detection.service';

describe('ScreenSizeDetectionService', () => {
  let service: ScreenSizeDetectionService;

  beforeEach(() => {
    // TestBed.configureTestingModule({});
    // service = TestBed.inject(ScreenSizeDetectionService);
    service = new ScreenSizeDetectionService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
