import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // Or your server host
      port: 5432,
      username: 'your_db_username',
      password: 'your_db_password',
      database: 'your_db_name',
      entities: [User],
      synchronize: true, // Only true for dev! 
    }),
    AuthModule,
  ],
})
export class AppModule {}
