import { Controller, Get,UseGuards,Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('hello')
export class HelloController {
  @UseGuards(JwtAuthGuard)
  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}
