import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/switchMap';
import { HttpService } from './http.service';

@Injectable()
export class PurchaseService {

    constructor(private http: HttpService) {

    }

    create(model) {
        let purchase = {
            rtn: model.rtn,
            pon: model.pon,
            notes: model.notes,
            products: model.products
        };

        return this.http.post('/api/v1/webapp/purchases', purchase);
    }

    update(model) {
        console.log('update has been called');
        return this.http.put('/api/v1/webapp/purchases/'+model.id+'/', model);
        // return of(model);
    }

    getAll() {
        return this.http.get('/api/v1/webapp/purchases');
    }

    read(id: number) {
        return this.http.get('/api/v1/webapp/purchases/'+id+'/');
    }

}