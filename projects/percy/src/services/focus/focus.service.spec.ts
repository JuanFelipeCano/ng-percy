
import { PercyFocusService } from './focus.service';

describe('PercyFocusService', () => {
  let service: PercyFocusService;

  beforeEach(() => {
    // TestBed.configureTestingModule({});
    // service = TestBed.inject(PercyFocusService);
    service = new PercyFocusService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
