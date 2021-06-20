import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ReminderService } from '../reminder.service';
import { ReminderViewModel } from '../viewModels/reminderViewModel';
import { DateViewModel } from '../viewModels/dateViewModel';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-day-details',
  templateUrl: './day-details.component.html',
  styleUrls: ['./day-details.component.css']
})
export class DayDetailsComponent implements OnInit, OnChanges {

  @Input("selectedDay")
  public selectedDay: DateViewModel | undefined;
  public reminders: ReminderViewModel[] = [];
  
  public reminderForm: FormGroup | undefined;
  public newReminder: ReminderViewModel = new ReminderViewModel;

  constructor(private reminderService: ReminderService) { }

  ngOnInit(): void {
    this.reminderForm = new FormGroup({
      name: new FormControl(this.newReminder.reminder, [
        Validators.required,
        Validators.maxLength(30)
      ])
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateRemindersList();
  }
  
  async updateRemindersList() {
    
    let reminders: ReminderViewModel[] = [];
    try {
      if(this.selectedDay)
        reminders = await this.reminderService.getRemindersForDate(this.selectedDay);
    } catch {
      reminders = [];
    }

    this.reminders = reminders;
  }

}
