import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { InsertComponent } from './components/insert/insert.component';
import { ClientComponent } from './components/client/client.component';
import { AuthGuard } from './guard/auth.guard';
import { InsertClientComponent } from './components/insert-client/insert-client.component';
import { AdminGuard } from './guard/admin.guard';


const routes: Routes = [
  { path: 'home', component: MainComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'insert', component: InsertComponent },
  {
    path: 'client/:email',
    component: ClientComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'insert-client',
    component: InsertClientComponent,
    canActivate: [AuthGuard],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
