import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsLegendChartComponentComponent } from './payments-legend-chart-component.component';

describe('PaymentsLegendChartComponentComponent', () => {
  let component: PaymentsLegendChartComponentComponent;
  let fixture: ComponentFixture<PaymentsLegendChartComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentsLegendChartComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsLegendChartComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
