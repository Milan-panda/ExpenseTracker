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
  foodDrinks = 0;
  shopping = 0;
  grocery = 0;
  transporation = 0;
  others = 0;

  constructor(private service: ExpenseDataService) {
     
    this.chartOptions = {
      series: [this.foodDrinks, this.shopping, this.grocery, this.transporation, this.others],
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
          if(item.category == "others"){
            this.others += item.amount;
          }else if(item.category == "shopping"){
            this.shopping += item.amount
          }else if(item.category == "grocery"){
            this.grocery += item.amount
          }else if(item.category == "food&drinks"){
            this.foodDrinks += item.amount
          }else if(item.category == "transportation"){
            this.transporation += item.amount
          }
        }
     
      });
    
      this.chartOptions = {
        series: [this.foodDrinks, this.shopping, this.grocery, this.transporation, this.others],
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
})
   


}  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
