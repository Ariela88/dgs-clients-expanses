import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/model/client';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit {
  clients: Client[] = [];
  searchQuery: string = '';
  searchResults: Client[] = [];

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.dataService.getClients().subscribe((clients: any) => {
      this.clients = clients;
    });
  }

  navigateToClient(email: string) {
    this.router.navigate(['/client', email]);
  }

  searchClients() {
    if (this.searchQuery.trim() !== '') {
      this.searchResults = this.clients.filter(client =>
        client.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.searchResults = [];
    }
  }

  clearSearchResults() {
    this.searchResults = [];
  }
}
