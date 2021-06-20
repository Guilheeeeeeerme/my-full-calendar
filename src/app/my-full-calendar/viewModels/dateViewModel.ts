export class DateViewModel {
  public withinTheViewMonth: boolean = false;
  public day: number = 0;
  public weekday: number = 0;
  public month: number = 0;
  public year: number = 0;

  public constructor(param: Date, viewMonth: number = -1) {
    viewMonth = viewMonth < 0 
      ? new Date().getMonth()
      : viewMonth;

    this.withinTheViewMonth = param.getMonth() == viewMonth;
    this.day = param.getDate();
    this.weekday = param.getDay();
    this.month = param.getMonth();
    this.year = param.getFullYear();
  }

  getFullDateString(): string {
    return `${this.year}-${this.month}-${this.day}`;
  }
}