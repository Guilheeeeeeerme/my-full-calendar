import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthlyCalendarComponent } from './monthly-calendar/monthly-calendar.component';
import { MonthlyDateComponent } from './monthly-date/monthly-date.component';



@NgModule({
  declarations: [
    MonthlyCalendarComponent,
    MonthlyDateComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MonthlyCalendarComponent,
    MonthlyDateComponent
  ]
})
export class MyFullCalendarModule { }
