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
  selector: 'app-expense-chart',
  templateUrl: './expense-chart.component.html',
  styleUrls: ['./expense-chart.component.css']
})
export class ExpenseChartComponent implements OnInit {

  
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
        }
      ]
    };
  }
   

  ngOnInit(): void {
  }

}
