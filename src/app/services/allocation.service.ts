import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { forkJoin } from 'rxjs/observable/forkJoin';
import 'rxjs/add/operator/switchMap';
import { HttpService } from './http.service';
import * as _ from 'lodash';

@Injectable()
export class AllocationService {

    constructor(private http: HttpService) {

    }

    save(model) {
        // get garbage ops for delete
        let garbageOps = this.getGarbageOps(model);
        // get ops for create
        let createOps = this.getCreateOps(model);
        // get ops for update
        let updateOps = this.getUpdateOps(model);
        // return when everything is good
        
        let allOps = [...garbageOps, ...createOps, ...updateOps];

        return forkJoin(...allOps);

    }

    private getUpdateOps(model: any) {
        let updateOps = [];
        // debugger;
        if (model.allocations && model.allocations.length) {
            model.allocations.forEach((item) => {
                if (item.id) {
                    updateOps.push(this.update({
                        ...item,
                        request: model.params.reqId,
                        request_item: model.params.reqItemId
                    }));
                }
            });
        } else {
            updateOps.push(of(true));
        }
        return updateOps; 
    }

    private getCreateOps(model: any) {
        let createOps = [];
        if (model.allocations && model.allocations.length) {
            model.allocations.forEach((item) => {
                if (!item.id) {
                    let purchaseItem = _.find(model.rawPurchases, {id: item.purchase_item});
                    console.log('found purchased item ', purchaseItem.purchase);
                    createOps.push(this.create({
                        ...item,
                        request: model.params.reqId,
                        request_item: model.params.reqItemId,
                        product: model.params.productId,
                        purchase: purchaseItem.purchase
                    }));
                }
            });
        } else {
            createOps.push(of(true));
        }
        return createOps;
    }

    private getGarbageOps(model) {
        let garbageOps = [];
        let garbages = model.garbageItems;
        if (garbages && garbages.length) {
            garbages.forEach((item) => {
                if (model.params.reqItemId && item.id) {
                    garbageOps.push(this.remove(model.params.reqItemId, item.id));
                }
            });
        } else {
            garbageOps.push(of(true));
        }

        if (!garbageOps.length) {
            garbageOps.push(of(true));
        }

        return garbageOps;
    }
    create(params) {
        return this.http.post('/api/v1/webapp/requests/'+params.request_item+'/allocate', params);
    }

    update(params) {
        return this.http.put('/api/v1/webapp/requests/'+params.request_item+'/allocate/'+params.id, params);
    }

    getAll() {
        return this.http.get('/api/v1/webapp/requests');
    }

    read(reqItemId: number) {
        return this.http.get('/api/v1/webapp/requests/'+reqItemId+'/allocate');
    }

    readItem(reqId: number, reqItemId: number) {
        return this.http.get('/api/v1/webapp/requests/'+reqId+'/items/'+reqItemId + '/');
    }

    remove(purchaseItemId: number, itemId: number) {
        return this.http.delete('/api/v1/webapp/requests/'+purchaseItemId+'/allocate/' + itemId);
    }

    getAllocationsFor(purchaseId: number, productId: number) {
        return this.http.get('/api/v1/webapp/allocations-for/'+ purchaseId +'/'+ productId);
    }

}