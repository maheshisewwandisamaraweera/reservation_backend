import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  serviceName: string;

  @Column()
  amount: number;

  @Column()
  paymentDate: string;

  @Column()
  paymentMethod: string;

  @Column()
  transactionId: string;
}
