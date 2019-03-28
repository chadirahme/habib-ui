import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsSupplierComponent } from './payments-supplier.component';

describe('PaymentsSupplierComponent', () => {
  let component: PaymentsSupplierComponent;
  let fixture: ComponentFixture<PaymentsSupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentsSupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
