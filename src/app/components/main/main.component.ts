import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/model/client';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  client?: Client;
  inputEmail: string = '';

  constructor(private data: DataService, private router: Router) {}

  

  redirectToDetails() {
    this.data.getClientByEmail(this.inputEmail).subscribe(
      (client) => {
        console.log('Client retrieved:', client);
        if (client) {
          this.router.navigate(['/details', client.email]);
        } else {
          console.log('Cliente non trovato');
        }
      },
      (error) => {
        console.error('Errore nel recupero del cliente:', error);
      }
    );
  }
  
  
}
