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
  totalExpenses: number = 0;
  expense?:Report[]=[]

  constructor(private route: ActivatedRoute, private dataService: DataService) {}

  ngOnInit(): void {
    const emailParam = this.route.snapshot.paramMap.get('email');
    this.clientEmail = emailParam !== null ? emailParam : '';

    this.dataService.getClientByEmail(this.clientEmail).subscribe(
      (client) => {
        if (client) {
          this.client = client;
          this.calculateTotalExpenses(); 
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
  calculateTotalExpenses() {
    if (this.client && this.client.expenses) {
      this.totalExpenses = this.client.expenses.reduce((total, expense: Report) => total + expense.amount, 0);
    } else {
      this.totalExpenses = 0;
    }
  }
  
  
  
  
  
}
