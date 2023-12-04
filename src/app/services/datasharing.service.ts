import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Client } from '../model/client';

@Injectable({
  providedIn: 'root'
})
export class DatasharingService {

  private expenseAddedSubject = new BehaviorSubject<Client | null>(null);
  private authenticatedSubject = new BehaviorSubject<Client | null>(null);
  authenticated$: Observable<Client | null> = this.authenticatedSubject.asObservable();
  expenseAdded$: Observable<Client | null> = this.expenseAddedSubject.asObservable();
  private triggerExpenseChartUpdateSource = new Subject<void>();
expenseChartUpdate$ = this.triggerExpenseChartUpdateSource.asObservable();





triggerExpenseChartUpdate() {
  this.triggerExpenseChartUpdateSource.next();
}

  notifyExpenseAdded(client: Client) {
    this.expenseAddedSubject.next(client);
  }


  notifyAuthenticated(client: Client): void {
    this.authenticatedSubject.next(client);
  }
}
