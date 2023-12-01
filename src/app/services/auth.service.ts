import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly clientKey = 'clients';

  getClients() {
    const clientsJson = localStorage.getItem(this.clientKey);
    return clientsJson ? JSON.parse(clientsJson) : [];
  }

  setClients(clients: any[]) {
    localStorage.setItem(this.clientKey, JSON.stringify(clients));
  }

  
}
