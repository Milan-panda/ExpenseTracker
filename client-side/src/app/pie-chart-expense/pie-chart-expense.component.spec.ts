import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieChartExpenseComponent } from './pie-chart-expense.component';

describe('PieChartExpenseComponent', () => {
  let component: PieChartExpenseComponent;
  let fixture: ComponentFixture<PieChartExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PieChartExpenseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PieChartExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
