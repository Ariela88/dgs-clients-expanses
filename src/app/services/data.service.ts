import { Injectable } from '@angular/core';
import { Client } from '../model/client';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  client?: Client;
  
  clients: Client[] = [
    {
      id: 0,
      name: 'Luca Rossi',
      email: 'lucarossi@gmail.com',
      expenses: []
    },
    {
      id: 1,
      name: 'Marco Verdi',
      email: 'marcoverdi@gmail.com',
      expenses: []
    },
    {
      id: 2,
      name: 'Sara Neri',
      email: 'saraneri@gmail.com',
      expenses: []
    },
  ];

  
  getClient(clientId: number): Observable<Client> {
    const client = this.clients.find(c => c.id === clientId);

     if (client) {
      return of(client);
    } else {
      
      return of();
    }
  }

  getClients():Observable<Client[]>{

    return of(this.clients)
  }
}
