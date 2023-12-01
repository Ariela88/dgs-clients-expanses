import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/model/client';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{
  client?: Client;
  inputEmail: string = '';

  constructor(private data: DataService, private router: Router) {}

  ngOnInit(): void {
        this.data.getClients().subscribe((data) => console.log(data));
  }

  redirectToDetails() {
    this.data.getClientByEmail(this.inputEmail).subscribe(
      (client) => {
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
