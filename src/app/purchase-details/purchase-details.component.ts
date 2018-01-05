import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Purchase } from '../models/purchase';
import { PurchaseItem } from '../models/purchase-item';
import { PurchaseService } from '../services/purchase.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-purchase-details',
  templateUrl: './purchase-details.component.html',
  styleUrls: ['./purchase-details.component.css']
})
export class PurchaseDetailsComponent implements OnInit {

  model: any;
  rawProducts: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private purchaseService: PurchaseService,
    private productService: ProductService
  ) {
    this.model = {
      rtn: '',
      pon: '',
      notes: '',
      products: [new PurchaseItem()],
      garbageItems: []
    };

    this.rawProducts = [];
  }

  newItem(e) {
    this.model.products.push(new PurchaseItem());
    e.preventDefault();
  }

  saveDetails() {
    console.log('firing with ', this.model);
    (
      this.model.id ? 
      this.purchaseService.update(this.model) : 
      this.purchaseService.create(this.model)
    )
    .subscribe(response => {
      this.router.navigateByUrl('/purchases');
    });
  }
  
  ngOnInit() {
    this.getPurchaseDetail();
    this.getProducts()
    .subscribe(response => {
      this.rawProducts = response;
    });
  }

  private getProducts() {
    return this.productService.getAll()
  }

  removeItem(e, index) {
    e.preventDefault();
    let removedItem = this.model.products.splice(index, 1);
    if(!this.model.garbageItems) {
      this.model.garbageItems = [];
    }
    console.log('state is ', this.model);
    this.model.garbageItems = this.model.garbageItems.concat(removedItem);
  }

  getPurchaseDetail() {
    const id = +this.route.snapshot.paramMap.get('id');
    if (!id) {
      return;
    }
    this.purchaseService.read(id)
    .subscribe(response => {
      this.model = response;
    })
    // console.log('purchase details for ', id);
  }

}
