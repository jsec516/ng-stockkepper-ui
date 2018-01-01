import { Component, OnInit } from '@angular/core';
import {SuiModalService, TemplateModalConfig, ModalTemplate} from 'ng2-semantic-ui';
import { Purchase } from '../models/purchase';

export interface IContext {
    data:any;
}

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent implements OnInit {

  purchases: Array<any> = [
    {
      id: 1,
      rtn: 'rtn-1',
      pon: '6000094322',
      products: [
        {
          location: 'Maiden',
          product: 'DCS-7010T-48-R',
        quantity: 20
      }]
    },
    {
      id: 2,
      rtn: 'rtn-2',
      pon: '6000094322',
      products: [
        {
          location: 'Maiden',
          product: 'DCS-7010T-48-R',
        quantity: 20
      }]
    }
  ];
  showDetail = false;
  selectedPurchase;

  loadDetail() {
    this.selectedPurchase = new Purchase();
    this.showDetail = true;
    console.log(this.selectedPurchase);
  }
  
  constructor() { }

  ngOnInit() {
  }

}
