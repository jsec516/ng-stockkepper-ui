import { Component, OnInit, VERSION } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Request } from '../models/request';
import { RequestItem } from '../models/request-item';
import { AllocatedItem } from '../models/allocated-item';
import { RequestService } from '../services/request.service';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.css']
})
export class RequestDetailsComponent implements OnInit {

  model: any;
  rawProducts: any;
  rawReqItems: any;
  name: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private requestService: RequestService,
    private productService: ProductService
  ) { 
    this.model = new Request();
    this.name = `Angular! v${VERSION.full}`
    this.rawProducts = [];
    this.rawReqItems = [];
  }

  newItem(e) {
    e.preventDefault();
    this.model.items = [...this.model.items, new RequestItem()];
  }


  removeItem(e, index) {
    e.preventDefault();
    let removedItem = this.model.items.splice(index, 1);
    console.log('garbage index is ', removedItem);
    if(!this.model.garbageItems) {
      this.model.garbageItems = [];
    }
    this.model.garbageItems = this.model.garbageItems.concat(removedItem);
  }

  ngOnInit() {
    this.getRequestDetail();
    this.getProducts()
    .subscribe(response => {
      this.rawProducts = response;
    });
  }

  private getProducts() {
    return this.productService.getAll()
  }

  getRequestDetail() {
    const id = +this.route.snapshot.paramMap.get('id');
    if (!id) {
      return;
    }
    this.requestService.read(id)
    .subscribe(response => {
      this.model = response;
      // let reqItems = this.model.items.slice(0);
      this.rawReqItems = [...this.model.items];
    })
  }

  saveDetails() {
    console.log('firing with ', this.model);
    (
      this.model.id ? 
      this.requestService.update(this.model) : 
      this.requestService.create(this.model)
    )
    .subscribe(response => {
      this.router.navigateByUrl('/requests');
    });
  }

}
