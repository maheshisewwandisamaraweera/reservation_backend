import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  async register(@Body() body: CreateUserDto) {
    console.log('Registering user:', body);
    const { user, token } = await this.userService.createUser(body);
    return { user, token };
  }

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const { user, token } = await this.userService.loginUser(body.username, body.password);
    return { user, token };
  }

  @Get('profile/:userId')
  async getProfile(@Param('userId') userId: string) { 
    const user = await this.userService.findByUserId(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  @Put('profile/:userId')
  async updateProfile(@Param('userId') userId: string, @Body() body: Partial<CreateUserDto>) {
    const user = await this.userService.findByUserId(userId);
    if (!user) {
      throw new Error('User not found');
    }
    const updatedUser = await this.userService.updateUser(userId, body);
    return updatedUser;
  }

  @Get('all')
  async getAllUsers() {
    const users = await this.userService.findAllUsers();
    return users;
  }

  @Put(':userId/status')
  async updateUserStatus(@Param('userId') userId: string, @Body('status') status: string) {
    const user = await this.userService.findByUserId(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const updatedUser = await this.userService.updateUserStatus(userId, status);
    return updatedUser;
  }
}
