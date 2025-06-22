import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Put } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/guards/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/user/dto/create-user.dto';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly service: AppointmentService) { }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SERVICE_PROVIDER_ADMIN, UserRole.SERVICE_PROVIDER_STAFF, UserRole.CLIENT, UserRole.SUPER_ADMIN)
 async getAllAppointments() {
    const appointments = await this.service.findAllAppointments();
    return appointments;
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SERVICE_PROVIDER_ADMIN, UserRole.SERVICE_PROVIDER_STAFF, UserRole.CLIENT, UserRole.SUPER_ADMIN)
  create(@Body() dto: CreateAppointmentDto) {
    return this.service.create(dto);
  }

  @Get(':userId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SERVICE_PROVIDER_ADMIN, UserRole.SERVICE_PROVIDER_STAFF, UserRole.CLIENT, UserRole.SUPER_ADMIN)
  findAll(@Param('userId') userId: string) {
    return this.service.findAll(userId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SERVICE_PROVIDER_ADMIN, UserRole.SERVICE_PROVIDER_STAFF, UserRole.CLIENT, UserRole.SUPER_ADMIN)
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SERVICE_PROVIDER_ADMIN, UserRole.SERVICE_PROVIDER_STAFF, UserRole.CLIENT, UserRole.SUPER_ADMIN)
  update(@Param('id') id: string, @Body() dto: UpdateAppointmentDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SERVICE_PROVIDER_ADMIN, UserRole.SERVICE_PROVIDER_STAFF, UserRole.CLIENT, UserRole.SUPER_ADMIN)
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }

  @Put('confirm/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SERVICE_PROVIDER_ADMIN, UserRole.SERVICE_PROVIDER_STAFF, UserRole.CLIENT, UserRole.SUPER_ADMIN)
  confirmAppointment(@Param('id') id: string, @Body() body: {confirmed: boolean}) {
    return this.service.confirmAppointment(id, body.confirmed);
  }
}
