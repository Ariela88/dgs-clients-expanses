import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Client } from '../model/client';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { DatasharingService } from './datasharing.service';


@Injectable({
  providedIn: 'root',
})
export class DataService {
  private clientsUrl = 'assets/expanses.json';
  private clientsSubject = new BehaviorSubject<Client[]>([]);
 
  constructor(private http: HttpClient,private auth:AuthService, private dataShar:DatasharingService) {
    this.saveInitialData();
    
  
  }

  getClients() {
    return of(this.auth.getClients());
  }

  addClient(client: Client) {
    const clients = this.auth.getClients();
    clients.push(client);
    this.auth.setClients(clients);
    this.clientsSubject.next(clients);

   
    this.dataShar.notifyExpenseAdded(client);

    return of(client);
  }
  
  saveInitialData() {
    const initialData = {
      clients: [
        {
          name: 'Luca Rossi',
          email: 'lucarossi@gmail.com',
          expenses: [
            { created: '2023-01-01', type: 'Food', amount: 50, receipt: true },
            { created: '2023-01-15', type: 'Transportation', amount: 30, receipt: false },
            { created: '2023-02-05', type: 'Entertainment', amount: 20, receipt: true },
          ],
        },
        {
          name: 'Mario Verdi',
          email: 'marioverdi@gmail.com',
          expenses: [
            { created: '2023-01-01', type: 'Food', amount: 50, receipt: true },
            { created: '2023-01-15', type: 'Transportation', amount: 30, receipt: false },
            { created: '2023-02-05', type: 'Entertainment', amount: 20, receipt: true },
          ],
        },
        {
          name: 'Sara Neri',
          email: 'saraneri@gmail.com.com',
          expenses: [
            { created: '2023-01-01', type: 'Food', amount: 50, receipt: true },
            { created: '2023-01-15', type: 'Transportation', amount: 30, receipt: false },
            { created: '2023-02-05', type: 'Entertainment', amount: 20, receipt: true },
          ],
        },
       
      ],
    };

    this.auth.setClients(initialData.clients);
  }

  getClientByEmail(email: string): Observable<Client | undefined> {
    const clients = this.auth.getClients();
    return of(clients.find((client:Client) => client.email === email));
  }

  setClient(){
    const clients = this.auth.getClients();
    this.auth.setClients(clients)
  }

  updateClient(updatedClient: Client) {
    const clients = this.auth.getClients();
    const index = clients.findIndex((c: Client) => c.email === updatedClient.email);

    if (index !== -1) {
      clients[index] = updatedClient;
      this.auth.setClients(clients);
      this.clientsSubject.next(clients);
    } else {
      console.error('Cliente non trovato per l\'aggiornamento.');
    }
  }
}
