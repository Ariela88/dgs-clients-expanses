import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of, switchMap, take } from 'rxjs';
import { Client } from '../model/client';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  
  private clientsUrl = 'assets/expanses.json'; 

  constructor(private http: HttpClient) {}

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.clientsUrl);
  }

  getClientByEmail(email: string): Observable<Client | null> {
    return this.getClients().pipe(
      map(clients => clients.find(client => client.email === email) || null)
    );
  }
  

  addClient(newClient: Client): Observable<undefined> {
    return this.getClients().pipe(
      take(1),
      switchMap(clients => {
        const existingClient = clients.find(client => client.email === newClient.email);

        if (!existingClient) {
          clients.push(newClient);
          localStorage.setItem('clients', JSON.stringify(clients));
        }

        return of(undefined);
      })
    );
  }
}
