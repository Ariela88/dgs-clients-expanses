import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Client } from 'src/app/model/client';
import { DataService } from 'src/app/services/data.service';
import { DatasharingService } from 'src/app/services/datasharing.service';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.scss']
})
export class InsertComponent implements OnInit {
  expenseForm!: FormGroup;
  clients?: Client[] = [];
  clientEmail?: string;

  
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private datasharingService: DatasharingService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.dataService.getClients().subscribe((clients:any) => {
      this.clients = clients;
    });

    this.route.params.subscribe((params) => {
      this.clientEmail = params['email'];
    });

    this.expenseForm = this.formBuilder.group({
      clientEmail: [this.clientEmail, Validators.required], 
      created: ['', Validators.required],
      type: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      receipt: [false, Validators.required],
    });
  }

  onSubmit() {
    if (this.expenseForm?.valid) {
      const newExpense = this.expenseForm.value;
      const clientIndex = this.clients?.findIndex((c) => c.email === newExpense.clientEmail);  
      if (clientIndex !== -1) {        
        const updatedClient = { ...this.clients![clientIndex!]};
        updatedClient.expenses.push({
          created: newExpense.created,
          type: newExpense.type,
          amount: newExpense.amount,
          receipt: newExpense.receipt,
        });       
        this.dataService.updateClient(updatedClient);        
        this.datasharingService.notifyExpenseAdded(updatedClient);
      }
    }
    this.expenseForm.reset()
  }
}
