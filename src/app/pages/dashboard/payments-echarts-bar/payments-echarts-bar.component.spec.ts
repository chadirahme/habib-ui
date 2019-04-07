import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsEchartsBarComponent } from './payments-echarts-bar.component';

describe('PaymentsEchartsBarComponent', () => {
  let component: PaymentsEchartsBarComponent;
  let fixture: ComponentFixture<PaymentsEchartsBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentsEchartsBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsEchartsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
