import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/model/client';
import { AuthService } from 'src/app/services/auth.service';
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
  noResultsFound: boolean = false;
  adminEmail?: string;

  constructor(private dataService: DataService, private router: Router,private authService:AuthService) {}

  ngOnInit(): void {
    this.dataService.getClients().subscribe((clients: any) => {
      this.clients = clients;
    });
    this.authService.loggedInUserEmail$.subscribe((email) => {
      if (email === 'admin') {
        this.adminEmail = email
      } else {
        this.adminEmail = undefined
      }
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
    this.noResultsFound = this.searchResults.length === 0;
  }

  clearSearchResults() {
    this.searchResults = [];
    this.noResultsFound = false;
    this.searchQuery = ''
  }

  
}
