import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentloginComponent } from './agentlogin.component';

describe('AgentloginComponent', () => {
  let component: AgentloginComponent;
  let fixture: ComponentFixture<AgentloginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgentloginComponent]
    });
    fixture = TestBed.createComponent(AgentloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
