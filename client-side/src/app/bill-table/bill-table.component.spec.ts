import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillTableComponent } from './bill-table.component';

describe('BillTableComponent', () => {
  let component: BillTableComponent;
  let fixture: ComponentFixture<BillTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
