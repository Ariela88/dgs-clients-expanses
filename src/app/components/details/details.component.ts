import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from 'src/app/model/client';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  clientEmail?: string;
  client?: Client;

  constructor(private route: ActivatedRoute, private dataService: DataService) {}

  ngOnInit(): void {
    const emailParam = this.route.snapshot.paramMap.get('email');
    this.clientEmail = emailParam !== null ? emailParam : '';

       this.dataService.getClientByEmail(this.clientEmail).subscribe(
      (client) => {
        
        if (client !== undefined) {
          this.client = client!;
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