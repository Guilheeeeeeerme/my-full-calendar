import { Injectable } from '@angular/core';
import { ReminderViewModel } from './viewModels/reminderViewModel';
import { v4 as uuidv4 } from 'uuid';
import { ReminderDateViewModel } from './viewModels/reminderDateViewModel';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {

  constructor() { }

  private get key() {
    return "my-reminders"
  }

  private sortReminders(dateA: ReminderViewModel, dateB: ReminderViewModel) {

    if (dateA.date.year > dateB.date.year) {
      return 1;
    }

    if (dateA.date.month > dateB.date.month) {
      return 1;
    }

    if (dateA.date.day > dateB.date.day) {
      return 1;
    }

    if (dateA.time.hour > dateB.time.hour) {
      return 1;
    }

    if (dateA.time.minute > dateB.time.minute) {
      return 1;
    }

    if (dateA.time.second > dateB.time.second) {
      return 1;
    }

    return -1;

  }

  updateReminder(reminderVm: ReminderViewModel): Promise<void> {

    if (!reminderVm || !reminderVm.reminder)
      throw "Unable to save reminder";

    if (reminderVm.reminder.length > 30)
      throw "Reminder name must have at most 30 characters";

    return new Promise((resolve, reject) => {
      try {

        const reminders_str = localStorage.getItem(this.key);
        let reminders: ReminderViewModel[] = [];

        if (!!reminders_str) {
          reminders = JSON.parse(reminders_str);
        } else {
          reminders = [];
        }

        reminders = reminders.filter((x) => {
          return x.id != reminderVm.id;
        })

        reminders.push(reminderVm);
        reminders = reminders.sort(this.sortReminders);
        localStorage.setItem(this.key, JSON.stringify(reminders));

        resolve()
      } catch (e) {
        reject(e)
      }
    })
  }

  addReminder(reminderVm: ReminderViewModel): Promise<void> {

    if (!reminderVm || !reminderVm.reminder)
      throw "Unable to save reminder";

    if (reminderVm.reminder.length > 30)
      throw "Reminder name must have at most 30 characters";

    return new Promise(async (resolve, reject) => {
      try {

        const reminders_str = localStorage.getItem(this.key);
        let reminders: ReminderViewModel[] = [];

        if (!!reminders_str) {
          reminders = JSON.parse(reminders_str);
        } else {
          reminders = [];
        }

        reminderVm.id = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
        reminders.push(reminderVm);
        reminders = reminders.sort(this.sortReminders);
        localStorage.setItem(this.key, JSON.stringify(reminders));

        resolve()
      } catch (e) {
        reject(e)
      }
    })
  }

  getRemindersForDate(reminderDateVm: ReminderDateViewModel): Promise<ReminderViewModel[]> {
    return new Promise((resolve, reject) => {

      const reminders_str = localStorage.getItem(this.key);
      let reminders: ReminderViewModel[] = [];

      if (!!reminders_str) {
        reminders = JSON.parse(reminders_str);
      } else {
        reminders = [];
      }

      if (reminders && reminders.length > 0) {
        reminders = reminders.filter(date => {
          return +date.date.year == +reminderDateVm.year
            && +(date.date.month - 1) == +reminderDateVm.month
            && +date.date.day == +reminderDateVm.day;
        })
      }

      resolve(reminders);

    });
  }

}
