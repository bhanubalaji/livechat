import { TestBed } from '@angular/core/testing';

import { UserpagemainService } from './userpagemain.service';

describe('UserpagemainService', () => {
  let service: UserpagemainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserpagemainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
