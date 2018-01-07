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
        let product = {
            name: model.name
        };

        return this.http.post('/api/v1/webapp/products', product);
    }

    update(model) {
        return this.http.put('/api/v1/webapp/products/'+model.id+'/', model);
    }

    getAll() {
        return this.http.get('/api/v1/webapp/products');
    }

    read(id: number) {
        return this.http.get('/api/v1/webapp/products/'+id+'/');
    }

    remove(id: number) {
        return this.http.delete('/api/v1/webapp/products/'+ id + '/');
    }

}