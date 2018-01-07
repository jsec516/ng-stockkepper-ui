import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import {SuiModule} from 'ng2-semantic-ui';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { PurchasesComponent } from './purchases/purchases.component';
import { AppRoutingModule } from './/app-routing.module';
import { PurchaseDetailsComponent } from './purchase-details/purchase-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RequestsComponent } from './requests/requests.component';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './services/auth.service';
import { PurchaseService } from './services/purchase.service';
import { ProductService } from './services/product.service';
import { HttpService } from './services/http.service';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';


@NgModule({
  declarations: [
    AppComponent,
    PurchasesComponent,
    PurchaseDetailsComponent,
    DashboardComponent,
    RequestsComponent,
    AuthComponent,
    ProductsComponent,
    ProductDetailsComponent
  ],
  imports: [
    FormsModule,
    SuiModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AuthService, HttpService, PurchaseService, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
