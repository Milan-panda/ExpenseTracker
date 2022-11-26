import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgApexchartsModule } from "ng-apexcharts";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardDataComponent } from './card-data/card-data.component';
import { ExpenseChartComponent } from './expense-chart/expense-chart.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ExpenseTableComponent } from './expense-table/expense-table.component';
import { PieChartExpenseComponent } from './pie-chart-expense/pie-chart-expense.component';
import { BarChartExpenseComponent } from './bar-chart-expense/bar-chart-expense.component';

@NgModule({
  declarations: [
    AppComponent,
    CardDataComponent,
    ExpenseChartComponent,
    NavbarComponent,
    ExpenseTableComponent,
    PieChartExpenseComponent,
    BarChartExpenseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgApexchartsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
