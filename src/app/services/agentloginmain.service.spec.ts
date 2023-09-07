import { TestBed } from '@angular/core/testing';

import { AgentloginmainService } from './agentloginmain.service';

describe('AgentloginmainService', () => {
  let service: AgentloginmainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentloginmainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
