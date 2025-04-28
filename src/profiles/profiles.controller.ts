import { Controller, Get, Put, Body, Param } from '@nestjs/common';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get(':userId')
  getProfile(@Param('userId') userId: string) {
    return this.profilesService.findById(userId);
  }

  @Put(':userId')
  updateProfile(@Param('userId') userId: string, @Body() updateData: any) {
    return this.profilesService.update(userId, updateData);
  }
}
