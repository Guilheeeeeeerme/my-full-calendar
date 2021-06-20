import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthlyCalendarComponent } from './monthly-calendar/monthly-calendar.component';



@NgModule({
  declarations: [
    MonthlyCalendarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MonthlyCalendarComponent
  ]
})
export class MyFullCalendarModule { }
