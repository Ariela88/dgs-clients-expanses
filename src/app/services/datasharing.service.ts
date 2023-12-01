import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client } from '../model/client';

@Injectable({
  providedIn: 'root'
})
export class DatasharingService {

  private expenseAddedSubject = new BehaviorSubject<Client | null>(null);

  expenseAdded$: Observable<Client | null> = this.expenseAddedSubject.asObservable();

  notifyExpenseAdded(client: Client) {
    this.expenseAddedSubject.next(client);
  }
}
