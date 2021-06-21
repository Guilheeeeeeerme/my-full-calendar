import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ReminderService } from '../reminder.service';
import { ReminderDateViewModel, ReminderTimeViewModel, ReminderViewModel } from '../viewModels/reminderViewModel';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-reminder',
  templateUrl: './create-reminder.component.html',
  styleUrls: ['./create-reminder.component.css']
})
export class CreateReminderComponent implements OnInit {

  @Input("selectedDay")
  public selectedDay: ReminderDateViewModel | undefined;

  public reminderForm: FormGroup = new FormGroup({});

  // required for bootstrap
  public datepickerInitialValue: ReminderDateViewModel | undefined;
  @ViewChild('dp', { static: false }) public dp: NgbDatepicker | undefined;

  @Output("onSaveReminder") public onSaveReminder : EventEmitter<void> = new EventEmitter();

  constructor(private reminderService: ReminderService) { }

  get reminder() { return this.reminderForm.get('reminder'); }
  get city() { return this.reminderForm.get('city'); }
  get date() { return this.reminderForm.get('date'); }
  get time() { return this.reminderForm.get('time'); }
  get color() { return this.reminderForm.get('color'); }

  ngAfterViewInit() {
    this.initDatePicker();
  }

  ngOnInit(): void {
    this.setFormValidation();
  }

  private setFormValidation(): void {
    this.reminderForm = new FormGroup({
      reminder: new FormControl('', [
        Validators.required,
        Validators.maxLength(30)
      ]),
      city: new FormControl('', [
        Validators.required,
        Validators.maxLength(30)
      ]),
      date: new FormControl('', [
        Validators.required,
        Validators.maxLength(30)
      ]),
      time: new FormControl('', [
        Validators.required,
        Validators.maxLength(30)
      ]),
      color: new FormControl('', [
        Validators.required,
        Validators.maxLength(30)
      ]),
    });
  }

  private initDatePicker(): void {

    if (this.dp && this.selectedDay) {
      this.datepickerInitialValue = new ReminderDateViewModel(this.selectedDay.year, this.selectedDay?.month + 1, this.selectedDay?.day)
      this.dp.navigateTo(this.datepickerInitialValue);
    }
  }

  AddReminder(): void {
    this.onSaveReminder.emit();
    const newReminder: ReminderViewModel = this.reminderForm.value as ReminderViewModel;
    this.reminderService.addReminder(newReminder);
  }

}
