// appointments/dto/create-appointment.dto.ts
export class CreateAppointmentDto {
  userId: number;
  serviceId: number;
  date: string;
  time: string;
  confirmed?: boolean; // optional if default false is used
}
