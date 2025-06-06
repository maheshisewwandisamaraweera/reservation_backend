import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Service } from '../../services/entities/service.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  rating: number;

  @Column()
  comment: string;

  @ManyToOne(() => Service, service => service.reviews)
  service: Service;
}
