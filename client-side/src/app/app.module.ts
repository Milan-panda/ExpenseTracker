import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { MyProfileComponent } from './my-profile/my-profile.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddBillComponent } from './add-bill/add-bill.component';
import { BillTableComponent } from './bill-table/bill-table.component';
  
@NgModule({
  declarations: [
    AppComponent,
    CardDataComponent,
    ExpenseChartComponent,
    NavbarComponent,
    ExpenseTableComponent,
    PieChartExpenseComponent,
    BarChartExpenseComponent,
    MyProfileComponent,
    NotFoundComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    LoadingSpinnerComponent,
    AddExpenseComponent,
    AddBillComponent,
    BillTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
