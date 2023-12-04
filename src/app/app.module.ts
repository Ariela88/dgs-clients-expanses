import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './components/main/main.component';
import { InsertComponent } from './components/insert/insert.component';
import { DetailsComponent } from './components/details/details.component';
import { MaterialModule } from './material/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { ClientComponent } from './components/client/client.component';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { ExpenseChartComponent } from './components/expense-chart/expense-chart.component';
import { NgChartsModule } from 'ng2-charts';
import { WatchComponent } from './components/watch/watch.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    InsertComponent,
    DetailsComponent,
    ClientComponent,
    LoginDialogComponent,
    ExpenseChartComponent,
    WatchComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgChartsModule,
    
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
