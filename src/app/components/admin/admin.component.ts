import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // // Verifica che l'utente sia autenticato e abbia il ruolo "admin"
    // if (this.authService.isAuthenticated() && this.authService.isAdmin()) {
    //   // Puoi inserire qui la logica specifica per l'area admin
    //   console.log('Accesso consentito all\'area admin');
    // } else {
    //   // Reindirizza o gestisci l'accesso non autorizzato
    //   console.log('Accesso negato all\'area admin');
    // }
  }

}
