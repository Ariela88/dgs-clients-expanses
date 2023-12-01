import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/model/client';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{
  client?:Client
  
  constructor(private data:DataService){}
  
    
    ngOnInit(): void {
      console.log('main component')
      this.data.getClient(0).subscribe(data=> {
        console.log(data,'main component')
      })

      this.data.getClients().subscribe(data=> console.log(data))
      
    }

}
