import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent {
  email: string = '';
  password: string = '';

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    private authService: AuthService
  ) {}

  async login(): Promise<void> {
    const isAuthenticated = await this.authService.authenticate(this.email, this.password);

    if (isAuthenticated) {
      this.dialogRef.close(true);
    } else {
     alert('Le credenziali sono errrate')
    }
  }

  closeDialog(): void {
    this.dialogRef.close(false);
  }

}
