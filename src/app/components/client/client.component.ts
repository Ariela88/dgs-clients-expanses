import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from 'src/app/model/client';
import { DataService } from 'src/app/services/data.service';
import { DatasharingService } from 'src/app/services/datasharing.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  clientEmail?: string;
  client?: Client;
  showInsert = false

  constructor(private route: ActivatedRoute, private dataService: DataService, private dataSharingService: DatasharingService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.clientEmail = params['email'];
      this.loadClientDetails();
    });

    
    this.dataSharingService.expenseAdded$.subscribe((client) => {
      if (client && this.client && this.client.email === client.email) {
        this.client = client;
        console.log('Dettagli del cliente aggiornati:', this.client);
      }
    });
  }

  loadClientDetails() {
    if (this.clientEmail) {
      this.dataService.getClientByEmail(this.clientEmail).subscribe(
        (client) => {
          if (client) {
            this.client = client;
            console.log('Dettagli del cliente:', this.client);
          } else {
            console.error('Cliente non trovato');
          }
        },
        (error) => {
          console.error('Errore nel recupero del cliente:', error);
        }
      );
    }
  }

  insertExpenses(){
    this.showInsert = !this.showInsert

  }
}