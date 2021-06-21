import { Injectable } from '@angular/core';
import { ReminderDateViewModel, ReminderViewModel } from './viewModels/reminderViewModel';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {

  constructor() { }

  addReminder(reminderViewModel: ReminderViewModel): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {

        const reminders_str = localStorage.getItem(this.key);
        let reminders: ReminderViewModel[] = [];
  
        if (!!reminders_str) {
          reminders = JSON.parse(reminders_str);
        } else {
          reminders = [];
        }

        reminderViewModel.id = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
        reminders.push(reminderViewModel);
        localStorage.setItem(this.key, JSON.stringify(reminders));
        resolve()
      } catch (e) {
        reject(e)
      }
    })
  }

  getRemindersForDate(dateViewModel: ReminderDateViewModel): Promise<ReminderViewModel[]> {
    return new Promise((resolve, reject) => {

      const reminders_str = localStorage.getItem(this.key);
      let reminders: ReminderViewModel[] = [];

      if (!!reminders_str) {
        reminders = JSON.parse(reminders_str);
      } else {
        reminders = [];
      }

      if(reminders && reminders.length > 0) {
        reminders = reminders.filter(date => {
          return +date.date.year == +dateViewModel.year 
            && +(date.date.month - 1) == +dateViewModel.month
            && +date.date.day == +dateViewModel.day; 
        })
      }

      resolve(reminders);

    });
  }

  get key() {
    return "my-reminders"
  }
}
