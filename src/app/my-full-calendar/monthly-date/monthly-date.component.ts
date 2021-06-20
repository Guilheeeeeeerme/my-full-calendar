import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DateViewModel } from '../viewModels/dateViewModel';

@Component({
  selector: 'app-monthly-date',
  templateUrl: './monthly-date.component.html',
  styleUrls: ['./monthly-date.component.css']
})
export class MonthlyDateComponent implements OnChanges {

  @Input("enabled") enabled: boolean = true;
  @Input("day") day: number = 0;
  @Input("weekday") weekday: number = 0;
  @Input("month") month: number = 0;
  @Input("year") year: number = 0;

  @Output("onSelectDate") public onSelectDate: EventEmitter<DateViewModel> = new EventEmitter();

  private currentDate: Date | undefined;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    try {
      const CurrentDate = new Date(this.year, this.month, this.day);
      this.currentDate = CurrentDate;
    } catch {}
  }

  public selectDate() {
    if(this.currentDate) {
      const currentDate = new DateViewModel(this.currentDate, this.month);
      this.onSelectDate.emit(currentDate);
    }
  }

}
