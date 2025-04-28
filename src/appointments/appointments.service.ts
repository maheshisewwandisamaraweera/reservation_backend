import { Injectable } from '@nestjs/common';

@Injectable()
export class AppointmentsService {
  private appointments = [];

  findByUser(userId: string) {
    return this.appointments.filter(app => app.userId === userId);
  }

  create(appointmentData: any) {
    this.appointments.push(appointmentData);
    return { message: 'Appointment booked successfully' };
  }
}
