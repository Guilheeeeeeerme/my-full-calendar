import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthlyCalendarComponent } from './monthly-calendar/monthly-calendar.component';
import { MonthlyDateComponent } from './monthly-date/monthly-date.component';
import { CreateReminderComponent } from './create-reminder/create-reminder.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MonthlyCalendarComponent,
    MonthlyDateComponent,
    CreateReminderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    MonthlyCalendarComponent,
    MonthlyDateComponent,
    CreateReminderComponent
  ]
})
export class MyFullCalendarModule { }
