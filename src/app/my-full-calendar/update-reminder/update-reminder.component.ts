import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ReminderService } from '../reminder.service';
import { ReminderViewModel } from '../viewModels/reminderViewModel';

@Component({
  selector: 'app-update-reminder',
  templateUrl: './update-reminder.component.html',
  styleUrls: ['./update-reminder.component.css']
})
export class UpdateReminderComponent implements OnChanges {

  @Input("selectedReminder") public selectedReminder: ReminderViewModel | undefined;

  constructor(private reminderService: ReminderService) { }

  ngOnChanges(changes: SimpleChanges): void {
    // throw new Error('Method not implemented.');
  }

}
