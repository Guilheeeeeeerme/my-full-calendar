import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { ReminderService } from '../reminder.service';
import { ReminderDateViewModel } from '../viewModels/reminderDateViewModel';
import { ReminderViewModel } from '../viewModels/reminderViewModel';

@Component({
  selector: 'app-update-reminder',
  templateUrl: './update-reminder.component.html',
  styleUrls: ['./update-reminder.component.css']
})
export class UpdateReminderComponent implements OnInit, OnChanges {

  @Input("selectedReminder") 
  public selectedReminder: ReminderViewModel | undefined;

  @Output("onUpdateReminder") 
  public onUpdateReminder : EventEmitter<void> = new EventEmitter();
  
  // required for bootstrap
  @ViewChild('dp', { static: false }) 
  public dp: NgbDatepicker | undefined; 
  
  public datepickerInitialValue: ReminderDateViewModel | undefined;
  public reminderForm: FormGroup = new FormGroup({});
  
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

  ngOnChanges(changes: SimpleChanges): void {
    // throw new Error('Method not implemented.');
  }

  private setFormValidation(): void {
    const selectedReminder = this.selectedReminder;

    this.reminderForm = new FormGroup({
      id: new FormControl(selectedReminder?.id),
      reminder: new FormControl(selectedReminder?.reminder, [
        Validators.required,
        Validators.maxLength(30)
      ]),
      city: new FormControl(selectedReminder?.city, [
        Validators.required,
        Validators.maxLength(30)
      ]),
      date: new FormControl(selectedReminder?.date, [
        Validators.required,
        Validators.maxLength(30)
      ]),
      time: new FormControl(selectedReminder?.time, [
        Validators.required,
        Validators.maxLength(30)
      ]),
      color: new FormControl(selectedReminder?.color, [
        Validators.required,
        Validators.maxLength(30)
      ]),
    });
  }

  private initDatePicker(): void {
    if (this.dp && this.selectedReminder) {
      this.datepickerInitialValue = this.selectedReminder.date;
      this.dp.navigateTo(this.datepickerInitialValue);
    }
  }

  UpdateReminder(): void {
    this.onUpdateReminder.emit();
    const updatedReminder: ReminderViewModel = this.reminderForm.value as ReminderViewModel;
    this.reminderService.updateReminder(updatedReminder);
  }

}
