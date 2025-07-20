import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentModule } from './appointments/appointment.module';
import { ServiceProviderModule } from './service-provider/service-provider.module';
import { StaffModule } from './staff/staff.module';
import { Staff } from './staff/staff.entity';
import { ServicesModule } from './services/services.module';
//import { AppointmentsModule } from './appointments/appointment.module';
import { UsersModule } from './users/users.module';
import { ReviewsModule } from './reviews/reviews.module';
import { PaymentsModule } from './payments/payments.module';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './config/typeorm.config';
import { HelloController } from './hello/hello.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AppointmentModule,
    ServiceProviderModule,
    StaffModule,
    ServicesModule,
    UsersModule,
    ReviewsModule,
    PaymentsModule,
    UserModule,
    AuthModule,
    
  ],
  controllers: [HelloController],
})
export class AppModule {}
