import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

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
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
