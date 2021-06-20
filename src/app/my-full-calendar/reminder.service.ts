import { Injectable } from '@angular/core';
import { ReminderViewModel } from './viewModels/reminderViewModel';
import { DateViewModel } from './viewModels/dateViewModel';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {

  constructor() { }

  addReminder(dateViewModel: DateViewModel, reminderViewModel: ReminderViewModel): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        let reminders = await this.getRemindersForDate(dateViewModel);
        reminders.push(reminderViewModel);
        localStorage.setItem(dateViewModel.getFullDateString(), JSON.stringify(reminders));
        resolve()
      } catch (e) {
        reject(e)
      }
    })
  }

  getRemindersForDate(selectedDay: DateViewModel): Promise<ReminderViewModel[]> {
    return new Promise((resolve, reject) => {

      const reminders_str = localStorage.getItem(selectedDay.getFullDateString());
      let reminders = [];

      if (!!reminders_str) {
        reminders = JSON.parse(reminders_str);
      } else {
        reminders = [];
      }

      resolve(reminders);

    });
  }
}
