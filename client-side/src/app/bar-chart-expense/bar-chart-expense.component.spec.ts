import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarChartExpenseComponent } from './bar-chart-expense.component';

describe('BarChartExpenseComponent', () => {
  let component: BarChartExpenseComponent;
  let fixture: ComponentFixture<BarChartExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarChartExpenseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarChartExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
