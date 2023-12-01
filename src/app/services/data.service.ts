import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Client } from '../model/client';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private clientsUrl = 'assets/expanses.json';

  constructor(private http: HttpClient) {}

  private getClientsFromStorage(): Client[] {
    const clientsJson = localStorage.getItem('clients');
    return clientsJson ? JSON.parse(clientsJson) : [];
  }

  getClients(): Observable<Client[]> {
    return this.http.get(this.clientsUrl).pipe(
      catchError((error) => {
        console.error('Error loading clients from server:', error);
        return of(this.getClientsFromStorage()); 
      }),
      map((data: any) => (data.clients ? data.clients : [])) 
    );
  }

  getClientByEmail(email: string): Observable<Client | null> {
    return this.getClients().pipe(
      map((clients) => clients.find((client) => client.email === email) || null)
    );
  }

  addClient(newClient: Client): Observable<undefined> {
    return this.getClients().pipe(
      switchMap((clients) => {
        const existingClient = clients.find((client) => client.email === newClient.email);

        if (!existingClient) {
          clients.push(newClient);
          localStorage.setItem('clients', JSON.stringify({ clients }));
        }

        return of(undefined);
      })
    );
  }
}
