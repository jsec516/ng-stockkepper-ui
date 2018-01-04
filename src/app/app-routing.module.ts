import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent }      from './auth/auth.component';
import { PurchasesComponent }      from './purchases/purchases.component';
import { PurchaseDetailsComponent }      from './purchase-details/purchase-details.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { RequestsComponent }      from './requests/requests.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: AuthComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'purchases', component: PurchasesComponent },
  { path: 'requests', component: RequestsComponent },
  { path: 'purchase/new', component: PurchaseDetailsComponent },
  { path: 'purchase-details/:id', component: PurchaseDetailsComponent }
];
@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
})
export class AppRoutingModule {}
