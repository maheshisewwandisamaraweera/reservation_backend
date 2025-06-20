import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserRole } from './dto/create-user.dto';
import { Service } from '../services/entities/service.entity';

@Entity()
export class User {
  [x: string]: any;
  @PrimaryGeneratedColumn()
  id: number;

 @Column({ type: 'enum', enum: UserRole, default: UserRole.CLIENT })
  role: UserRole;

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

  @Column({ nullable: true })
  status?: string;

  @OneToMany(() => Service, service => service.user)
  services: Service[];
}
