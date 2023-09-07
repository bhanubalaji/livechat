import { TestBed } from '@angular/core/testing';

import { AgentpagemainService } from './agentpagemain.service';

describe('AgentpagemainService', () => {
  let service: AgentpagemainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentpagemainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
