import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../services/request.service';
import { PurchaseService } from '../services/purchase.service';
import { AllocationService } from '../services/allocation.service';
import { AllocatedItem } from '../models/allocated-item';

@Component({
  selector: 'app-allocation-details',
  templateUrl: './allocation-details.component.html',
  styleUrls: ['./allocation-details.component.css']
})
export class AllocationDetailsComponent implements OnInit {

  model: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private requestService: RequestService,
    private purchaseService: PurchaseService,
    private allocationService: AllocationService,
  ) {
    this.model = {
      params: {},
      allocations: [],
      requestedItem: {

      },
      rawPurchases: []
    };

   }

   onModalDismiss(e) {
    console.log('event is ', e);
    this.router.navigate(['request-details', this.model.params.reqId])
    // navigate to parent page here
   }

   onSave(modal) {
     this.allocationService.save(this.model)
     .subscribe(result => {
       console.log('saved');
       modal.approve('done');
     })
   }

  ngOnInit() {
    const reqId = +this.route.snapshot.paramMap.get('reqId');
    this.model.params.reqId = reqId;
    const reqItemId = +this.route.snapshot.paramMap.get('reqItemId');
    this.model.params.reqItemId = reqItemId;
    this.getRequestedItemDetail(reqId, reqItemId);
    this.getAllocations(reqItemId);
  }

  private getRequestedItemDetail(reqId: number, reqItemId: number) {
    if (!reqId) {
      return;
    }
    this.requestService.readItem(reqId, reqItemId)
    .subscribe((response: any) => {
      this.model.requestedItem = response;
      if(response && response.product) {
        this.model.params.productId = response.product;
        this.getPurchasedItemListFor(response.product);
      }
    });
  }

  removeItem(e, index) {
    e.preventDefault();
    let removedItem = this.model.allocations.splice(index, 1);
    if(!this.model.garbageItems) {
      this.model.garbageItems = [];
    }
    this.model.garbageItems = this.model.garbageItems.concat(removedItem);
  }

  newItem(e) {
    e.preventDefault();
    this.model.allocations = [...this.model.allocations, new AllocatedItem()];
  }

  getPurchasedItemListFor(productId) {
    this.purchaseService.readItemListFor(productId)
    .subscribe(response => {
      console.log('raw purchases for product ', response);
      this.model.rawPurchases = response;
    });
  }

  getAllocations(reqItemId) {
    this.allocationService.read(reqItemId)
    .subscribe(response => {
      this.model.allocations = response;
    });
  }

}
