import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceProvider } from './service-provider.entity';
import { ServiceProviderService } from './service-provider.service';
import { ServiceProviderController } from './service-provider.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceProvider])],
  providers: [ServiceProviderService],
  controllers: [ServiceProviderController],
})
export class ServiceProviderModule {}
