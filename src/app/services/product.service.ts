import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/switchMap';
import { HttpService } from './http.service';

@Injectable()
export class ProductService {

    constructor(private http: HttpService) {

    }

    create(model) {
        // let purchase = {
        //     rtn: model.rtn,
        //     pon: model.pon,
        //     notes: model.note,
        //     products: model.products
        // };

        // return this.http.post('/api/v1/webapp/purchases', purchase);
    }

    getAll() {
        return this.http.get('/api/v1/webapp/products');
    }

}