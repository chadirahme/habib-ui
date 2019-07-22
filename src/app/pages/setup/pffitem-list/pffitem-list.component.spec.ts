import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PffitemListComponent } from './pffitem-list.component';

describe('PffitemListComponent', () => {
  let component: PffitemListComponent;
  let fixture: ComponentFixture<PffitemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PffitemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PffitemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
