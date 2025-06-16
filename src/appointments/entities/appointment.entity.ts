import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Service } from '../../services/entities/service.entity';
import { User } from '../../user/user.entity'; 

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.appointments)
  user: User;

  @ManyToOne(() => Service, service => service.appointments)
  service: Service;

  @Column()
  date: string;

  @Column()
  time: string;

  @Column({ default: false })
  confirmed: boolean;
}