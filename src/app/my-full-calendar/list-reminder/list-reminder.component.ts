import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ReminderService } from '../reminder.service';
import { ReminderDateViewModel, ReminderViewModel } from '../viewModels/reminderViewModel';

@Component({
  selector: 'app-list-reminder',
  templateUrl: './list-reminder.component.html',
  styleUrls: ['./list-reminder.component.css']
})
export class ListReminderComponent implements OnChanges {

  @Input("selectedDay")
  public selectedDay: ReminderDateViewModel | undefined;

  @Output("onSelectReminder") 
  public onSelectReminder: EventEmitter<ReminderViewModel> = new EventEmitter();

  public reminders: ReminderViewModel[] = [];

  constructor(private reminderService: ReminderService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateRemindersList();
  }

  async updateRemindersList() {

    let reminders: ReminderViewModel[] = [];
    try {
      if (this.selectedDay)
        reminders = await this.reminderService.getRemindersForDate(this.selectedDay);
    } catch {
      reminders = [];
    }

    this.reminders = reminders;
  }

  public onSelect(reminder: ReminderViewModel) {
    this.onSelectReminder.emit(reminder);
  }

}
