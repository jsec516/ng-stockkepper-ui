import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { forkJoin } from 'rxjs/observable/forkJoin';
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
        // console.log('update has been called');
        let garbageOps = [];
        let garbages = model.garbageItems;
        if (garbages && garbages.length) {
            garbages.forEach((item) => {
                if (model.id && item.id) {
                    garbageOps.push(this.remove(model.id, item.id));
                }
            });
        } else {
            garbageOps.push(of(true));
        }

        if (!garbageOps.length) {
            garbageOps.push(of(true));
        }
        // delete model.garbageItems;

        return forkJoin(...garbageOps)
        .switchMap(results => {
            return this.http.put('/api/v1/webapp/purchases/'+model.id+'/', model);
        });
        // return of(model);
    }

    getAll() {
        return this.http.get('/api/v1/webapp/purchases');
    }

    read(id: number) {
        return this.http.get('/api/v1/webapp/purchases/'+id+'/');
    }

    remove(purchaseId: number, itemId: number) {
        return this.http.delete('/api/v1/webapp/purchases/'+purchaseId+'/items/' + itemId + '/');
    }

}