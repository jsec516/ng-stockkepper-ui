import { Component, OnInit, ViewChild } from '@angular/core';
import {SuiModalService, TemplateModalConfig, ModalTemplate} from 'ng2-semantic-ui';
import { AuthService } from '../services/auth.service';
import { PurchaseService } from '../services/purchase.service';
import { Router } from '@angular/router';

export interface IContext {
  data:any;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('modalTemplate')
  public modalTemplate:ModalTemplate<IContext, any, any>
  model: any;
  constructor(
    public modalService:SuiModalService,
    private authService: AuthService,
    private purchaseService: PurchaseService,
    private router: Router
  ) { 
    this.model = {
      purchaseItems: []
    };
  }

  ngOnInit() {
    this.authService.isLoggedIn()
      .subscribe(
      x => {
        console.log('logged successfully');
        this.getPurchaseItems();
      },
      e => {
        console.log('onError: %s', e);
        this.router.navigateByUrl('/login');
      },
      () => console.log('onCompleted')
      );
  }

  private getPurchaseItems() {
    this.purchaseService.getAllPurchasedItem()
    .subscribe(results => {
      this.model.purchaseItems = results;
    });
  }

  openDialog(event, p) {
    event.preventDefault();
    const config = new TemplateModalConfig<IContext, any, any>(this.modalTemplate);

    config.closeResult = "closed!";
    config.context = { data: p.item_allocations };

    this.modalService
        .open(config)
        .onApprove(result => { /* approve callback */ })
        .onDeny(result => { /* deny callback */});
  }

}
