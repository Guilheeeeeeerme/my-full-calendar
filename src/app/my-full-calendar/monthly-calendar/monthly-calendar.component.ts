import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DateViewModel } from '../viewModels/dateViewModel';

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
  public selectedDay: DateViewModel | undefined;

  constructor() {
    this.buildCalendarHeader();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.UpdateCalendarState();
  }

  public onDateSelect(date: DateViewModel) {
    this.selectedDay = date;
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

  private buildCalendarRows(currentMonth: number, currentYear: number) {
    
    const rangeOfDays: DateViewModel[] = [];

    let viewMonthStartsAt = new Date(currentYear, currentMonth, 1);
    let viewMonthEndsAt = new Date(currentYear, currentMonth + 1, 0);

    // fill the left side until sunday
    while (viewMonthStartsAt.getDay() != 0) {
      viewMonthStartsAt.setDate(viewMonthStartsAt.getDate() - 1);
    }

    // fill the right side until saturday
    while (viewMonthEndsAt.getDay() != 6) {
      viewMonthEndsAt.setDate(viewMonthEndsAt.getDate() + 1);
    }

    while(viewMonthStartsAt <= viewMonthEndsAt) {
      rangeOfDays.push(new DateViewModel(viewMonthStartsAt, viewMonthStartsAt.getMonth() == currentMonth));
      viewMonthStartsAt.setDate(viewMonthStartsAt.getDate() + 1);
    }

    this.rangeOfDays = rangeOfDays;

  }


}
