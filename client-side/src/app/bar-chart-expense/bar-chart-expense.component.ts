import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
  ApexResponsive
} from "ng-apexcharts";
import { ExpenseDataService } from '../shared/services/expense-data.service';
import { UsersService } from '../shared/services/users.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  responsive: ApexResponsive[];

};


@Component({
  selector: 'app-bar-chart-expense',
  templateUrl: './bar-chart-expense.component.html',
  styleUrls: ['./bar-chart-expense.component.css']
})
export class BarChartExpenseComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  
income = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
expenses = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  constructor(private service: ExpenseDataService, private usersService: UsersService) {
    let currency;
    this.usersService.getUserData(JSON.parse(localStorage.getItem('userData')).email).subscribe(res=>{
      if(res[0].currency=='dollar'){
        currency='$'
      }
      else if(res[0].currency=='rupee'){
        currency='₹'
      }
      else if(res[0].currency=='euro'){
        currency='€'
      }
      else if(res[0].currency=='dinar'){
        currency='د.إ'
      }
      
      else if(res[0].currency=='ponud'){
        currency='£'
      }
      
    })
    this.chartOptions = {
      series: [
        {
          name: "Income",
          data: this.income
        },
        {
          name: "Expenditure",
          data: this.expenses
        },
        
      ],
      chart: {
        type: "bar",
        height: 350,
        width:600,
    
      },
      responsive: [
        {
          breakpoint: 3400,
          options: {
            chart: {
              width: 600
            }
          }
        },
        {
          breakpoint: 800,
          options: {
            chart: {
              width: 500
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
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ]
      },
      yaxis: {
        title: {
          text: "Amount"
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return currency+" "+ val;
          }
        }
      }
    };
      this.service.getYearlyData((new Date().getFullYear()).toString(),JSON.parse(localStorage.getItem('userData')).email).subscribe({next: (data)=>{ // change the email argument according to current logged in user
        data.forEach(item => {
          const monthIndex = parseInt(item.date.substring(5, 7));
          if(item.expenseType === "expense"){
            this.expenses[monthIndex-1] += item.amount;
          }else{
            this.income[monthIndex - 1] += item.amount;
          }
        });
        this.chartOptions = {
          series: [
            {
              name: "Income",
              data: this.income
            },
            {
              name: "Expenditure",
              data: this.expenses
            },
            
          ],
          chart: {
            type: "bar",
            height: 350,
            width:600,
        
          },
          responsive: [
            {
              breakpoint: 3400,
              options: {
                chart: {
                  width: 600
                }
              }
            },
            {
              breakpoint: 800,
              options: {
                chart: {
                  width: 500
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
          ],
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: "55%",
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            show: true,
            width: 2,
            colors: ["transparent"]
          },
          xaxis: {
            categories: [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December"
            ]
          },
          yaxis: {
            title: {
              text: "Amount"
            }
          },
          fill: {
            opacity: 1
          },
          tooltip: {
            y: {
              formatter: function(val) {
                return currency + " " + val ;
              }
            }
          }
        }
      }
    })
  }
  ngOnInit() {
  }
}
