import { Controller, Get,UseGuards,Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/guards/roles.decorator';
import { UserRole } from 'src/user/dto/create-user.dto';    
import { User } from 'src/user/user.entity';

@Controller('hello')
export class HelloController {
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.CLIENT)
  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}
