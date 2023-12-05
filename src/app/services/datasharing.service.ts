import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Client,Report } from '../model/client';

@Injectable({
  providedIn: 'root',
})
export class DatasharingService {
  private expenseAddedSubject = new BehaviorSubject<Client | null>(null);
  private authenticatedSubject = new BehaviorSubject<Client | null>(null);
  private triggerExpenseChartUpdateSource = new Subject<void>();
  private expensesSubject = new BehaviorSubject<Report[]>([]);
  expenses$: Observable<Report[]> = this.expensesSubject.asObservable();
  authenticated$: Observable<Client | null> =
    this.authenticatedSubject.asObservable();
  expenseAdded$: Observable<Client | null> =
    this.expenseAddedSubject.asObservable();
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
