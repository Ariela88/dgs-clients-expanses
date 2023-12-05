import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client } from '../model/client';
import { DatasharingService } from './datasharing.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly clientKey = 'clients';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();
  private loggedInUserEmailSubject = new BehaviorSubject<string | undefined>(undefined);
  loggedInUserEmail$: Observable<string | undefined> = this.loggedInUserEmailSubject.asObservable();

  constructor(private dataShar: DatasharingService) {}

  getClients() {
    const clientsJson = localStorage.getItem(this.clientKey);
    return clientsJson ? JSON.parse(clientsJson) : [];
  }

  setClients(clients: any[]) {
    localStorage.setItem(this.clientKey, JSON.stringify(clients));
  }



  authenticate(email: string, password: string): boolean {
    const clients = this.getClients();
    const client = clients.find((c: Client) => c.email === email);

    if (client && client.password === password) {
      this.isAuthenticatedSubject.next(true);
      this.dataShar.notifyAuthenticated(client);
      
      if (email === 'admin@gmail.com') {
        this.loggedInUserEmailSubject.next('admin');
      } else {
        this.loggedInUserEmailSubject.next(email);
      }
      
      return true;
    } else {
      return false;
    }
  }
  logout(): void {
    this.isAuthenticatedSubject.next(false);
    this.loggedInUserEmailSubject.next(undefined); 
  }

  getUserRole(): string {
    const clients = this.getClients();
    const loggedInUser = clients[0];

    if (loggedInUser) {
      return loggedInUser.role;
    }  
    return 'user';
  }

  
}
