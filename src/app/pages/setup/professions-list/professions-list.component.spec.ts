import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionsListComponent } from './professions-list.component';

describe('ProfessionsListComponent', () => {
  let component: ProfessionsListComponent;
  let fixture: ComponentFixture<ProfessionsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessionsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
