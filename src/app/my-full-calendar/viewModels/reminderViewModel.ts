
export class ReminderTimeViewModel {
    constructor(
        public hour: number,
        public minute: number,
        public second: number){}
}


export class ReminderDateViewModel {
    constructor(
        public year: number,
        public month: number,
        public day: number){}
}

export class ReminderViewModel {

    constructor(
        public id: string,
        public reminder: string,
        public city: string,
        public date: ReminderDateViewModel,
        public time: ReminderTimeViewModel,
        public color: string,) {
    }
}