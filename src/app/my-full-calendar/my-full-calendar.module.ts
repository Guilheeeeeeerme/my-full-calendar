import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthlyCalendarComponent } from './monthly-calendar/monthly-calendar.component';
import { MonthlyDateComponent } from './monthly-date/monthly-date.component';
import { DayDetailsComponent } from './day-details/day-details.component';



@NgModule({
  declarations: [
    MonthlyCalendarComponent,
    MonthlyDateComponent,
    DayDetailsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MonthlyCalendarComponent,
    MonthlyDateComponent,
    DayDetailsComponent
  ]
})
export class MyFullCalendarModule { }
