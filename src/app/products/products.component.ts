import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Array<any> = [];

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.productService.getAll()
    .subscribe((data: Array<any>) => {
      this.products = data;
    });
  }

}
