import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { InsertComponent } from './components/insert/insert.component';
import { DetailsComponent } from './components/details/details.component';
import { ClientComponent } from './components/client/client.component';

const routes: Routes = [
  {path: 'home',component:MainComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: 'login',component:LoginComponent},
  {path: 'insert',component:InsertComponent},
  { path: 'client/:email', component: ClientComponent },
  { path: 'details/:email', component: DetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
