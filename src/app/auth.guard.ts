import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root' // This makes the guard available in the root module
})

export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const isAuthenticated = sessionStorage.getItem('agent') !== null;
    // const isAuthenticatedofanother = sessionStorage.getItem('agent') !== null;


    if (isAuthenticated) {
    
      return true;
    } else {
      this.router.navigate(['agentlogin']);
      return false;
    }
  }
}
