// insert.component.ts
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/model/client';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.scss']
})
export class InsertComponent {

  clientForm: FormGroup;
  newClient: Client = {
    name: '',
    email: '',
    expenses: [],
  };

  clients: Client[] = []

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private cdRef: ChangeDetectorRef,private route: Router ) {
    this.clientForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    this.dataService.getClients().subscribe(data=> {
      console.log(data)
    })
  }

  onSubmit() {
    console.log('cliccato');
    if (this.clientForm?.valid) {
      const formValue = this.clientForm.value as Client;
      this.dataService.addClient(formValue).subscribe(
        () => {
          console.log('Nuovo cliente aggiunto con successo.');
          this.clientForm?.reset(); 
          this.cdRef.detectChanges();
        },
        (error) => {
          console.error('Errore durante l\'aggiunta del cliente:', error);
        },
        () => {
          console.log('Observable completato.');
        }
      );
    }
    console.log(this.clientForm.value);
    this.route.navigate(['/details', this.clientForm.get('email')?.value]);
  }
}
