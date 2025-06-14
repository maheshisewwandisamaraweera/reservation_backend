import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  username?: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  contactNumber?: string;

  @Column({ nullable: true })
  businessName?: string;

  @Column({ nullable: true })
  businessType?: string;

  @Column({ nullable: true })
  otp?: string;

  @Column({ nullable: true, type: 'timestamp' })
  otpExpiresAt?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  profilePicture?: string;
}
