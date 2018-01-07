import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  model: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {
    this.model = new Product();
   }

   saveDetails() {
    console.log('firing with ', this.model);
    (
      this.model.id ? 
      this.productService.update(this.model) : 
      this.productService.create(this.model)
    )
    .subscribe(response => {
      this.router.navigateByUrl('/products');
    });
  }

  ngOnInit() {
    this.getProductDetail()
    .subscribe(response => {
      this.model = response;
    });
  }

  getProductDetail() {
    const id = +this.route.snapshot.paramMap.get('id');
    if (!id) {
      return of(new Product());
    }
    return this.productService.read(id);
  }

}
