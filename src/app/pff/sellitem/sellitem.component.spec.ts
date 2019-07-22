import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellitemComponent } from './sellitem.component';

describe('SellitemComponent', () => {
  let component: SellitemComponent;
  let fixture: ComponentFixture<SellitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
