import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Client } from '../model/client';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { DatasharingService } from './datasharing.service';


@Injectable({
  providedIn: 'root',
})
export class DataService {
  private clientsSubject = new BehaviorSubject<Client[]>([]);

  constructor(private dataShar: DatasharingService, private auth: AuthService) {
    this.saveInitialData();
    this.dataShar.authenticated$.subscribe((client) => {
      const clients = this.auth.getClients();
      this.clientsSubject.next(clients);
    });
  }

  getClients(): Observable<Client[]> {
    const clients = this.auth.getClients();
    return of(clients);
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
          password: 'luca',
          expenses: [
            { created: '2023-01-01', type: 'Food', amount: 50, receipt: true },
            { created: '2023-01-13', type: 'Transportation', amount: 30, receipt: false },
            { created: '2023-02-05', type: 'Entertainment', amount: 20, receipt: true },
            { created: '2023-02-07', type: 'Telephone', amount: 10, receipt: true },
            { created: '2023-02-09', type: 'Laundry', amount: 35, receipt: true },
            { created: '2023-02-11', type: 'Parking', amount: 5, receipt: false },
          ],
        },
        {
          name: 'Mario Verdi',
          email: 'marioverdi@gmail.com',
          password: 'mario',
          expenses: [
            { created: '2023-01-01', type: 'Food', amount: 80, receipt: true },
            { created: '2023-01-03', type: 'Transportation', amount: 50, receipt: false },
            { created: '2023-02-05', type: 'Entertainment', amount: 5, receipt: true },
            { created: '2023-02-06', type: 'Telephone', amount: 15, receipt: true },
            { created: '2023-02-10', type: 'Laundry', amount: 20, receipt: true },
            { created: '2023-02-20', type: 'Library', amount: 10, receipt: false },
          ],
        },
        {
          name: 'Sara Neri',
          email: 'saraneri@gmail.com',
          password: 'sara',
          expenses: [
            { created: '2023-01-01', type: 'Food', amount: 50, receipt: true },
            { created: '2023-01-12', type: 'Transportation', amount: 30, receipt: false },
            { created: '2023-02-07', type: 'Entertainment', amount: 20, receipt: true },
            { created: '2023-02-05', type: 'Internet', amount: 25, receipt: false },
            { created: '2023-02-15', type: 'Laundry', amount: 40, receipt: true },
            { created: '2023-02-17', type: 'Parking', amount: 10, receipt: false },
          ],
        },
        {
          name: 'Admin',
          email: 'admin@gmail.com',
          password: 'admin', 
          role: 'admin', 
          expenses: [          
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