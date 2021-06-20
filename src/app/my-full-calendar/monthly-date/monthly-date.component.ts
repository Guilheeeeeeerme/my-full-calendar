import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ReminderService } from '../reminder.service';
import { DateViewModel } from '../viewModels/dateViewModel';
import { ReminderViewModel } from '../viewModels/reminderViewModel';

@Component({
  selector: 'app-monthly-date',
  templateUrl: './monthly-date.component.html',
  styleUrls: ['./monthly-date.component.css']
})
export class MonthlyDateComponent implements OnChanges {

  @Input("withinTheViewMonth") withinTheViewMonth: boolean = true;
  @Input("day") day: number = 0;
  @Input("weekday") weekday: number = 0;
  @Input("month") month: number = 0;
  @Input("year") year: number = 0;

  @Output("onSelectDate") public onSelectDate: EventEmitter<DateViewModel> = new EventEmitter();

  private currentDate: DateViewModel | undefined;
  public reminders: ReminderViewModel[] = [];

  constructor(private reminderService: ReminderService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.LoadReminders();
  }

  private async LoadReminders() {
    try {
      const CurrentDate = new Date(this.year, this.month, this.day);
      this.currentDate = new DateViewModel(CurrentDate, this.withinTheViewMonth);
      this.reminders = await this.reminderService.getRemindersForDate(this.currentDate);
    } catch {
      this.reminders = []
    }
  }

  public selectDate() {
    if (this.currentDate) {
      this.onSelectDate.emit(this.currentDate);
    }
  }

}
