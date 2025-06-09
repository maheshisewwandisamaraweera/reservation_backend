import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffModule } from './staff/staff.module';
import { Staff } from './staff/staff.entity';
import { ServicesModule } from './services/services.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { UsersModule } from './users/users.module';
import { ReviewsModule } from './reviews/reviews.module';
import { PaymentsModule } from './payments/payments.module';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // or your DB host
      port: 5432,
      username: 'your_db_user',
      password: 'your_db_password',
      database: 'your_db_name',
      entities: [Staff],
      synchronize: true, // Only in dev mode!
    }),
    StaffModule,
      host: 'localhost',    // your PG host
      port: 5432,           // your PG port
      username: 'yourusername',
      password: 'yourpassword',
      database: 'yourdatabase',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // set false in production; true auto creates tables
    }),
    ServicesModule,
    AppointmentsModule,
    UsersModule,
    ReviewsModule,
    PaymentsModule,
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'your_password',
      database: 'your_db',
      entities: [User],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
