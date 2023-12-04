import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Client, Report } from 'src/app/model/client';
import { DatasharingService } from 'src/app/services/datasharing.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  clientEmail?: string;
  client?: Client;
  totalExpenses: number = 0;
  graphicVisible = false

  constructor(private route: ActivatedRoute, private dataService: DataService, private dataSharingService: DatasharingService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.clientEmail = params['email'];
      this.loadClientDetails();
    });

    this.dataSharingService.expenseAdded$.subscribe(() => {
      this.loadClientDetails();
    });
  }

  loadClientDetails() {
    if (this.clientEmail) {
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
  }

  calculateTotalExpenses() {
    if (this.client && this.client.expenses) {
      this.totalExpenses = this.client.expenses.reduce((total, expense) => total + expense.amount!, 0);
    } else {
      this.totalExpenses = 0;
    }
  }

  showGraphic(){
this.graphicVisible = !this.graphicVisible
this.dataSharingService.triggerExpenseChartUpdate();
  }
}