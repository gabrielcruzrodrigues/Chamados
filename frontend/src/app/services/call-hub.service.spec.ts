import { TestBed } from '@angular/core/testing';

import { CallHubService } from './call-hub.service';

describe('CallHubService', () => {
  let service: CallHubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CallHubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
