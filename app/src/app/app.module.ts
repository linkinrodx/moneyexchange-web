import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TypeaheadModule } from 'ngx-bootstrap';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SecurityService } from './services/security.service';

import { CurrencyPipe} from '@angular/common';

import { ToastaModule } from 'ngx-toasta';
import { AlertService } from './services/alert.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TypeaheadModule.forRoot(),
    HttpClientModule,
    ToastaModule.forRoot()
  ],
  providers: [
    SecurityService,
    CurrencyPipe,
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
