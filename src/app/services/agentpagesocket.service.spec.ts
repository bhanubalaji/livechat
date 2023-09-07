import { TestBed } from '@angular/core/testing';

import { AgentpagesocketService } from './agentpagesocket.service';

describe('AgentpagesocketService', () => {
  let service: AgentpagesocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentpagesocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
