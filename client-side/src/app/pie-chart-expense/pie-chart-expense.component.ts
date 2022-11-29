import { Component, OnInit } from '@angular/core';

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-pie-chart-expense',
  templateUrl: './pie-chart-expense.component.html',
  styleUrls: ['./pie-chart-expense.component.css']
})
export class PieChartExpenseComponent implements OnInit {
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [44, 55, 13, 43, 22,],
     chart: {
        type: "pie"
      },
      
      labels: ["Food & Drinks", "Shopping", "Groceries", "Transportation", "Others"],
      responsive: [
        {
          breakpoint: 3400,
          options: {
            chart: {
              width: 600
            },
            legend: {
              position: "right",
              fontSize:"20px"
            }
          }
        },
        {
          breakpoint: 800,
          options: {
            chart: {
              width: 500
            },
            legend: {
              position: "bottom",
              fontSize:"20px"
            }
          }
        },
        {
          breakpoint: 600,
          options: {
            chart: {
              width: 400
            }
          }
        }
      ]
    };
  }
   

  ngOnInit(): void {
  }

}
