import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { InsertComponent } from './components/insert/insert.component';
import { ClientComponent } from './components/client/client.component';
import { AuthGuard } from './guard/auth.guard';


const routes: Routes = [
  { path: 'home', component: MainComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'insert', component: InsertComponent },
  {
    path: 'client/:email',
    component: ClientComponent,
    canActivate: [AuthGuard],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
