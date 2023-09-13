// import { TestBed } from '@angular/core/testing';
// import { CanActivateFn } from '@angular/router';

// import { AuthGuard } from './auth.guard';

// describe('authGuard', () => {
//   const executeGuard: CanActivateFn = (...guardParameters) => 
//       TestBed.runInInjectionContext(() => new AuthGuard(...guardParameters));

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//   });

//   it('should be created', () => {
//     expect(executeGuard).toBeTruthy();
//   });
// });


import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';


describe('UserpageComponent', () => {
  let component:AuthGuard ;
  let fixture: ComponentFixture<AuthGuard >;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthGuard ]
    });
    fixture = TestBed.createComponent(AuthGuard );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
