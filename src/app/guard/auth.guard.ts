import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../components/login-dialog/login-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private dialog: MatDialog
  ) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const isAuthenticated = await this.showLoginDialog();
    if (isAuthenticated) {
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
