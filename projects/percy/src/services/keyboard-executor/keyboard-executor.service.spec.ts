
import { PercyKeyboardExecutorService } from './keyboard-executor.service';

describe('PercyKeyboardExecutorService', () => {
  let service: PercyKeyboardExecutorService;

  beforeEach(() => {
    // TestBed.configureTestingModule({});
    // service = TestBed.inject(PercyKeyboardExecutorService);
    service = new PercyKeyboardExecutorService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
