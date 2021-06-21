import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OpenWeatherService } from '../open-weather.service';
import { ReminderService } from '../reminder.service';
import { ReminderDateViewModel } from '../viewModels/reminderDateViewModel';
import { ReminderViewModel } from '../viewModels/reminderViewModel';

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

  @Output("onUpdateReminder")
  public onUpdateReminder: EventEmitter<void> = new EventEmitter();

  @Output("onCreateReminder")
  public onCreateReminder: EventEmitter<void> = new EventEmitter();

  @ViewChild('updateReminderModal', { static: false }) 
  public updateReminderModal: ElementRef | undefined;

  public reminders: ReminderViewModel[] = [];
  public selectedReminder: ReminderViewModel | undefined;

  constructor(private modalService: NgbModal,
    private reminderService: ReminderService,
    private openWeatherService: OpenWeatherService) { }

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
    for (const iterator of reminders) {
      this.updateWeatherData(iterator);
    }

    this.reminders = reminders;
  }

  private async updateWeatherData(reminderViewModel: ReminderViewModel) {

    try {
      const r = reminderViewModel;
      if (!r.weatherInfo) {
        const weatherInfo = await this.openWeatherService.getWeatherForecast(r.city, 1);
        debugger;
        r.weatherInfo = weatherInfo;
        await this.reminderService.updateReminder(r);
      }
    } catch {

    }
  }

  public onSelect(reminder: ReminderViewModel) {
    this.selectedReminder = reminder;
    this.onSelectReminder.emit(reminder);

    this.modalService.open(this.updateReminderModal, { ariaLabelledBy: 'modal-basic-title' })
      .result.then((result) => {
        console.log(`Closed with: ${result}`);
      }, (reason) => {
        console.log(`Dismissed with: ${reason}`);
      });

  }

  public onUpdateReminderModalDismised() {
    this.modalService.dismissAll();
  }

  public onReminderUpdated() {
    this.modalService.dismissAll();
    this.onUpdateReminder.emit();
  }

}
