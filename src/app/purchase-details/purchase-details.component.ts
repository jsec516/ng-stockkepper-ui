import { Component, OnInit } from '@angular/core';
import { Purchase } from '../models/purchase';

@Component({
  selector: 'app-purchase-details',
  templateUrl: './purchase-details.component.html',
  styleUrls: ['./purchase-details.component.css']
})
export class PurchaseDetailsComponent implements OnInit {

  model: Purchase;
  constructor() {
    this.model = new Purchase();
  }

  saveDetails() {
    console.log(this.model);
  }
  
  ngOnInit() {
  }

}
