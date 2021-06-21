import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CalendarDateViewModel } from '../viewModels/CalendarDateViewModel';
import { ReminderViewModel } from '../viewModels/reminderViewModel';

@Component({
  selector: 'app-monthly-calendar',
  templateUrl: './monthly-calendar.component.html',
  styleUrls: ['./monthly-calendar.component.css']
})
export class MonthlyCalendarComponent implements OnChanges {

  @Input("month") public currentMonth: number = 0;
  @Input("year") public currentYear: number = 0;
  public weekDays: string[] = [];

  public rangeOfDays: CalendarDateViewModel[] = [];
  public selectedDay: CalendarDateViewModel | undefined;

  public selectedReminder: ReminderViewModel | undefined;
  
	@ViewChild('listReminderModal', { static: false }) public listReminderModal: ElementRef | undefined;

  constructor(private modalService: NgbModal) {
    this.buildCalendarHeader();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.setCalendarState();
  }

  private setCalendarState(): void {
    const currentMonth = this.currentMonth;
    const currentYear = this.currentYear;
    this.buildCalendarRows(currentMonth, currentYear);
  }

  /**
   * set the select date to parent in order to filter the daily events
   */
  public onDateSelected(date: CalendarDateViewModel) {
    this.selectedDay = date;
    const listReminderModal = this.listReminderModal;
    this.openModal(listReminderModal);
  }

  /**
   * Called from the list component in order to allow update
   */
  public onReminderSelected(reminder: ReminderViewModel) {
    this.selectedReminder = reminder;
  }

  /*
  * Events from the create modal
  */

  public openModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then((result) => {
        console.log(`Closed with: ${result}`);
      }, (reason) => {
        console.log(`Dismissed with: ${reason}`);
      });
  }

  public onReminderModalDismised() {
    this.modalService.dismissAll();
  }

  public onReminderSaved() {
    this.modalService.dismissAll();
    // }
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

    const rangeOfDays: CalendarDateViewModel[] = [];

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

    while (viewMonthStartsAt <= viewMonthEndsAt) {
      rangeOfDays.push(new CalendarDateViewModel(viewMonthStartsAt, viewMonthStartsAt.getMonth() == currentMonth));
      viewMonthStartsAt.setDate(viewMonthStartsAt.getDate() + 1);
    }

    this.rangeOfDays = rangeOfDays;

  }


}
