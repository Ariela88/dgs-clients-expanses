import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoginDialogComponent } from '../components/login-dialog/login-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private dialog: MatDialog) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const isAuthenticated = await this.showLoginDialog();
    if (isAuthenticated && this.authService.isAdmin()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }

  private async showLoginDialog(): Promise<boolean> {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '400px',
      disableClose: true,
    });

    return dialogRef.afterClosed().toPromise();
  }
}
