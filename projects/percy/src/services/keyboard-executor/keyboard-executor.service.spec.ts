import { TestBed } from '@angular/core/testing';

import { KeyboardExecutorService } from './keyboard-executor.service';

describe('KeyboardExecutorService', () => {
  let service: KeyboardExecutorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeyboardExecutorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
