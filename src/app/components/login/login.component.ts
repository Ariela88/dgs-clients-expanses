import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string;
  password: string = ''; 

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) {
    this.email = this.route.snapshot.paramMap.get('email') || ''; 
  }

  login(): void {
    const isAuthenticated = this.authService.authenticate(this.email, this.password);

    if (isAuthenticated) {
      this.router.navigate(['/client', this.email]);
    }
  }
}
