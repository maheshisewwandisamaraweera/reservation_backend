// import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
// import { Appointment } from '../../appointments/entities/appointment.entity';

// @Entity()
// export class User {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({ unique: true })
//   email: string;

//   @Column({ unique: true })
//   username: string;

//   @Column()
//   password: string;

//   @Column()
//   address: string;

//   @Column({ nullable: true })
//   businessName: string;

//   @Column({ nullable: true })
//   businessType: string;

//   @Column()
//   contactNumber: string;

//   @Column()
//   role: string;

//   @OneToMany(() => Appointment, appointment => appointment.user)
//   appointments: Appointment[];
// }
