import { Component, OnInit } from '@angular/core';

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";
import { ExpenseDataService } from '../shared/services/expense-data.service';

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
  foodDrinks=0;
  shopping=0;
  grocery=0;
  transportation=0;
  others=0;

  constructor(private service: ExpenseDataService) {
     
    this.chartOptions = {
      series: [this.foodDrinks, this.shopping, this.grocery, this.transportation, this.others],
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
    this.service.getMonthlyData((new Date().getMonth()+1).toString(),JSON.parse(localStorage.getItem('userData')).email).subscribe({next: (data) => { // change the email argument according to current logged in user
      data.forEach(item => {
        if(item.expenseType=="expense"){
          if(item.category == "Others"){
            this.others += item.amount;
          }else if(item.category == "Shopping"){
            this.shopping += item.amount
          }else if(item.category == "Grocery"){
            this.grocery += item.amount
          }else if(item.category == "Food & Drinks"){
            this.foodDrinks += item.amount
          }else if(item.category == "Transportation"){
            this.transportation += item.amount
          }
        }
     
      });
    
      this.chartOptions = {
        series: [this.foodDrinks, this.shopping, this.grocery, this.transportation, this.others],
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
                width: 350
              }
            }
          }
        ]
        };
  }
  })
}
   

  ngOnInit(): void {
   
  }
}
