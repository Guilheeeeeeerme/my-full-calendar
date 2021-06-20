import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-monthly-date',
  templateUrl: './monthly-date.component.html',
  styleUrls: ['./monthly-date.component.css']
})
export class MonthlyDateComponent implements OnInit {

  @Input("enabled") enabled: boolean = true;
  @Input("day") day: number = 0;
  @Input("month") month: number = 0;
  @Input("year") year: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
