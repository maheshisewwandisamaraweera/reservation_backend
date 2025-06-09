import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Appointment } from '../../appointments/entities/appointment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @OneToMany(() => Appointment, appointment => appointment.user)
  appointments: Appointment[];
}
