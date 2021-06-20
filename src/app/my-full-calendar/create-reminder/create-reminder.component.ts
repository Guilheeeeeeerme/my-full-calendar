import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ReminderService } from '../reminder.service';
import { ReminderViewModel } from '../viewModels/reminderViewModel';
import { DateViewModel } from '../viewModels/dateViewModel';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-reminder',
  templateUrl: './create-reminder.component.html',
  styleUrls: ['./create-reminder.component.css']
})
export class CreateReminderComponent implements OnInit, OnChanges {

  @Input("selectedDay")
  public selectedDay: DateViewModel | undefined;
  public reminders: ReminderViewModel[] = [];

  public reminderForm: FormGroup = new FormGroup({});
  public newReminder: ReminderViewModel = new ReminderViewModel;

  constructor(private reminderService: ReminderService) { }

  // get name() { return this.heroForm.get('name'); }
  // get power() { return this.heroForm.get('power'); }

  ngOnInit(): void {
    this.reminderForm = new FormGroup({
      reminder: new FormControl(this.newReminder.reminder, [
        Validators.required,
        Validators.maxLength(30)
      ]),
      city: new FormControl(this.newReminder.city, [
        Validators.required,
        Validators.maxLength(30)
      ]),
      day: new FormControl(this.newReminder.day, [
        Validators.required,
        Validators.maxLength(30)
      ]),
      time: new FormControl(this.newReminder.time, [
        Validators.required,
        Validators.maxLength(30)
      ]),
      color: new FormControl(this.newReminder.color, [
        Validators.required,
        Validators.maxLength(30)
      ]),
    });
  }

  get reminder() { return this.reminderForm.get('reminder'); }
  get city() { return this.reminderForm.get('city'); }
  get day() { return this.reminderForm.get('day'); }
  get time() { return this.reminderForm.get('time'); }
  get color() { return this.reminderForm.get('color'); }

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

  AddReminder(): void {
    const newReminder: ReminderViewModel = this.reminderForm.value as ReminderViewModel;
    this.reminderService.addReminder(this.selectedDay as DateViewModel, newReminder);
    debugger;
  }

}
