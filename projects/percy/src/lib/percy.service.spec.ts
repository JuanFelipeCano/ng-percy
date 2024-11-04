import { TestBed } from '@angular/core/testing';

import { PercyService } from './percy.service';

describe('PercyService', () => {
  let service: PercyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PercyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
