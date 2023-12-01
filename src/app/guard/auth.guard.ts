import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const email = prompt('Inserisci l\'email per accedere ai dettagli del cliente:');
    const password = prompt('Inserisci la password per accedere ai dettagli del cliente:');
  
    if (email && password && this.authService.authenticate(email, password)) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
