import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DateViewModel } from '../dateViewModel';

@Component({
  selector: 'app-monthly-calendar',
  templateUrl: './monthly-calendar.component.html',
  styleUrls: ['./monthly-calendar.component.css']
})
export class MonthlyCalendarComponent implements OnChanges {

  @Input("month") public currentMonth: number = 0;
  @Input("year") public currentYear: number = 0;
  public weekDays: string[] = [];
  public rangeOfDays: DateViewModel[] = [];

  constructor() {
    this.buildCalendarHeader();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.UpdateCalendarState();
  }

  private UpdateCalendarState(): void {
    const currentMonth = this.currentMonth;
    const currentYear = this.currentYear;
    this.buildCalendarRows(currentMonth, currentYear);
  }

  /**
   * TODO: make it generic with a locale parameter
   */
  private buildCalendarHeader() {
    this.weekDays = [
      'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ]
  }

  buildCalendarRows(currentMonth: number, currentYear: number) {
    
    const rangeOfDays: DateViewModel[] = [];

    let monthStartsAt = new Date(currentYear, currentMonth, 1);
    let monthEndsAt = new Date(currentYear, currentMonth + 1, 0);

    while (monthStartsAt.getDay() != 0) {
      monthStartsAt.setDate(monthStartsAt.getDate() - 1);
    }

    while (monthEndsAt.getDay() != 6) {
      monthEndsAt.setDate(monthEndsAt.getDate() + 1);
    }

    while(monthStartsAt <= monthEndsAt) {
      rangeOfDays.push({
        enabled: monthStartsAt.getMonth() == currentMonth,
        day: monthStartsAt.getDate(),
        month: monthStartsAt.getMonth(),
        year: monthStartsAt.getFullYear(),
      });
      monthStartsAt.setDate(monthStartsAt.getDate() + 1);
    }

    this.rangeOfDays = rangeOfDays;

  }


}
