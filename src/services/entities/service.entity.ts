import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Appointment } from '../../appointments/entities/appointment.entity';
import { Review } from '../../reviews/entities/review.entity';

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  category: string;

  @Column()
  price: string;

  @OneToMany(() => Appointment, appointment => appointment.service)
  appointments: Appointment[];

  @OneToMany(() => Review, review => review.service)
  reviews: Review[];
}
