import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentModule } from './appointment/appointment.module';
import { ServiceProviderModule } from './service-provider/service-provider.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'your_username',
      password: 'your_password',
      database: 'your_database',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AppointmentModule,
    ServiceProviderModule,
  ],
})
export class AppModule {}
