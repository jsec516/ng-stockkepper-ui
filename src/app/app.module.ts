import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import {SuiModule} from 'ng2-semantic-ui';

import { AppComponent } from './app.component';
import { PurchasesComponent } from './purchases/purchases.component';
import { AppRoutingModule } from './/app-routing.module';
import { PurchaseDetailsComponent } from './purchase-details/purchase-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RequestsComponent } from './requests/requests.component';


@NgModule({
  declarations: [
    AppComponent,
    PurchasesComponent,
    PurchaseDetailsComponent,
    DashboardComponent,
    RequestsComponent
  ],
  imports: [
    FormsModule,
    SuiModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
