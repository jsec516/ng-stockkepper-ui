import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Purchase } from '../models/purchase';

@Component({
  selector: 'app-purchase-details',
  templateUrl: './purchase-details.component.html',
  styleUrls: ['./purchase-details.component.css']
})
export class PurchaseDetailsComponent implements OnInit {

  model: any;
  constructor(private route: ActivatedRoute) {
    this.model = {
      rtn: '',
      pon: '',
      note: '',
      products: [new Purchase()],
      rawProducts: [
        {id: 5, name: 'AAA'},
        {id: 6, name: 'BBB'}
      ]
    };
  }

  newItem(e) {
    this.model.products.push(new Purchase());
    e.preventDefault();
  }

  saveDetails() {
    console.log(this.model);
  }
  
  ngOnInit() {
    this.getPurchaseDetail();
  }

  getPurchaseDetail() {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log('purchase details for ', id);
  }

}
