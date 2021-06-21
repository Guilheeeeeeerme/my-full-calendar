import { ReminderDatePipe } from './reminder-description.pipe';

describe('ReminderDescriptionPipe', () => {
  it('create an instance', () => {
    const pipe = new ReminderDatePipe();
    expect(pipe).toBeTruthy();
  });
});
