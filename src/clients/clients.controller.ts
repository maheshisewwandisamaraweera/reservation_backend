import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ClientsService } from './clients.service';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post('register')
  async register(@Body() clientData: any) {
    return this.clientsService.create(clientData);
  }

  @Get(':email')
  async findByEmail(@Param('email') email: string) {
    return this.clientsService.findOneByEmail(email);
  }
}
