import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, ManyToOne, ManyToMany } from 'typeorm';
import { Appointment } from '../../appointments/entities/appointment.entity';
import { Review } from '../../reviews/entities/review.entity';
import { User } from '../../user/user.entity';

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne( () => User, user => user.services)
  user: User;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column()
  price: number;

  @Column({ nullable: true })
  duration?: string;

  @OneToMany(() => Appointment, appointment => appointment.service)
  appointments: Appointment[];

  @OneToMany(() => Review, review => review.service)
  reviews: Review[];
}
