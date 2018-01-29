import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseAllocationDetailsComponent } from './purchase-allocation-details.component';

describe('PurchaseAllocationDetailsComponent', () => {
  let component: PurchaseAllocationDetailsComponent;
  let fixture: ComponentFixture<PurchaseAllocationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseAllocationDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseAllocationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
