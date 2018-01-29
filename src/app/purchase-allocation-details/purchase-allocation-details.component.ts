import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AllocationService } from '../services/allocation.service';

@Component({
  selector: 'app-purchase-allocation-details',
  templateUrl: './purchase-allocation-details.component.html',
  styleUrls: ['./purchase-allocation-details.component.css']
})
export class PurchaseAllocationDetailsComponent implements OnInit {
  model: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private allocationService: AllocationService
  ) { 
    this.model = {
      allocations: []
    };
  }

  onModalDismiss(e) {
    this.router.navigate(['dashboard'])
  }

  ngOnInit() {
    const purchaseId = +this.route.snapshot.paramMap.get('purchaseId');
    const productId = +this.route.snapshot.paramMap.get('productId');
    this.allocationService.getAllocationsFor(purchaseId, productId)
    .subscribe(response => {
      this.model.allocations = response;
    });
  }

}
