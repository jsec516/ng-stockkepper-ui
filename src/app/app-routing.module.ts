import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent }      from './auth/auth.component';
import { PurchasesComponent }      from './purchases/purchases.component';
import { PurchaseDetailsComponent }      from './purchase-details/purchase-details.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { ProductsComponent }      from './products/products.component';
import { ProductDetailsComponent }      from './product-details/product-details.component';
import { RequestsComponent }      from './requests/requests.component';
import { RequestDetailsComponent }      from './request-details/request-details.component';
import { AllocationDetailsComponent }      from './allocation-details/allocation-details.component';
import { PurchaseAllocationDetailsComponent }      from './purchase-allocation-details/purchase-allocation-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: AuthComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'product/new', component: ProductDetailsComponent },
  { path: 'product-details/:id', component: ProductDetailsComponent },
  { path: 'purchases', component: PurchasesComponent },
  { path: 'requests', component: RequestsComponent },
  { path: 'request/new', component: RequestDetailsComponent },
  { path: 'request-details/:id', component: RequestDetailsComponent },
  { path: 'request/:reqId/item/:reqItemId/allocation', component: AllocationDetailsComponent },
  { path: 'purchase-allocation-details/:purchaseId/:productId', component: PurchaseAllocationDetailsComponent },
  { path: 'purchase/new', component: PurchaseDetailsComponent },
  { path: 'purchase-details/:id', component: PurchaseDetailsComponent }
];
@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
})
export class AppRoutingModule {}
