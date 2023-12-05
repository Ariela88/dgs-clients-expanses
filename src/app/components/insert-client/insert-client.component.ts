import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from 'src/app/model/client';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-insert-client',
  templateUrl: './insert-client.component.html',
  styleUrls: ['./insert-client.component.scss']
})
export class InsertClientComponent {

  newClientForm!: FormGroup;
  clients?: Client[] = [];
  newClientEmail?: string;
  @Input() adminEmail?: string;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private authService:AuthService
   
  ) {}

  ngOnInit() {
    this.dataService.getClients().subscribe((clients: Client[]) => {
      this.clients = clients;
    });

    this.newClientForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      created: [new Date(), Validators.required],
      role: ['user', Validators.required], 
    });
    this.authService.loggedInUserEmail$.subscribe((email) => {
      if (email === 'admin') {
        this.adminEmail = email
      } else {
        this.adminEmail = undefined
      }
    });
  }

  onSubmit() {
    if (this.newClientForm?.valid) {
      const newClient: Client = this.newClientForm.value;
      this.dataService.addClient(newClient);
     
      this.newClientForm.reset();
    }
  }
}
