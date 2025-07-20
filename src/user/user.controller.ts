import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UserRole } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/guards/roles.decorator';
import {SendEmail} from '../utils/emailService';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SERVICE_PROVIDER_ADMIN, UserRole.SERVICE_PROVIDER_STAFF, UserRole.CLIENT, UserRole.SUPER_ADMIN)
  async getProfile(@Param('userId') userId: string) {
    const user = await this.userService.findByUserId(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  @Put('profile/:userId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SERVICE_PROVIDER_ADMIN, UserRole.SERVICE_PROVIDER_STAFF, UserRole.CLIENT, UserRole.SUPER_ADMIN)
  async updateProfile(@Param('userId') userId: string, @Body() body: Partial<CreateUserDto>) {
    const user = await this.userService.findByUserId(userId);
    if (!user) {
      throw new Error('User not found');
    }
    const updatedUser = await this.userService.updateUser(userId, body);
    return updatedUser;
  }

  @Get('all')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  //@Roles(UserRole.SERVICE_PROVIDER_ADMIN, UserRole.SERVICE_PROVIDER_STAFF, UserRole.CLIENT, UserRole.SUPER_ADMIN)
  async getAllUsers() {
    const users = await this.userService.findAllUsers();
    return users;
  }

  @Put(':userId/status')
  //@UseGuards(JwtAuthGuard, RolesGuard)
  //@Roles(UserRole.SERVICE_PROVIDER_ADMIN, UserRole.SERVICE_PROVIDER_STAFF, UserRole.CLIENT, UserRole.SUPER_ADMIN)
  async updateUserStatus(@Param('userId') userId: string, @Body('status') status: string) {
    const user = await this.userService.findByUserId(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const updatedUser = await this.userService.updateUserStatus(userId, status);
    return updatedUser;
  }

  @Get('business')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SERVICE_PROVIDER_ADMIN, UserRole.SERVICE_PROVIDER_STAFF, UserRole.CLIENT, UserRole.SUPER_ADMIN)
  async getBusinessUsers() {
    const businessUsers = await this.userService.findBusinessNames();
    console.log('Business users:', businessUsers);
    return businessUsers;
  }

  @Get('serviceStaff/:businessName')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SERVICE_PROVIDER_ADMIN, UserRole.SERVICE_PROVIDER_STAFF, UserRole.CLIENT, UserRole.SUPER_ADMIN)
  async getServiceStaff(@Param('businessName') businessName: string) {
    const services = await this.userService.findStaffListByBusinessName(businessName);
    return services;
  }

  @Post('serviceStaff/add/:userId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SERVICE_PROVIDER_ADMIN, UserRole.SERVICE_PROVIDER_STAFF, UserRole.CLIENT, UserRole.SUPER_ADMIN)
  async addServiceStaffById(@Param('userId') userId: string) {
    const updatedUser = await this.userService.updateStaffUserStatus(userId);
    return updatedUser;
  }

  @Delete('serviceStaff/remove/:userId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SERVICE_PROVIDER_ADMIN, UserRole.SERVICE_PROVIDER_STAFF, UserRole.CLIENT, UserRole.SUPER_ADMIN)
  async removeServiceStaffById(@Param('userId') userId: string) {
    const updatedUser = await this.userService.removeStaffUser(userId);
    return updatedUser;
  }

  @Post('send-otp')
  async sendOtp(@Body('email') email: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(`Generated OTP for ${email}: ${otp}`);
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);
    await this.userService.saveOtp(String(user.id), otp, expiresAt);
    await SendEmail(email, 'Your OTP Code', `Your OTP code is: ${otp}. Your OTP is valid for 10 minutes.`);

    console.log(`OTP sent to ${email}: ${otp}`);

    return { message: 'OTP sent successfully' };
  }

  @Post('verify-otp')
  async verifyOtp(@Body('email') email: string, @Body('otp') otp: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    const savedOtp = await this.userService.findByEmail(user.email);
    if (savedOtp && savedOtp.otp === otp && new Date(savedOtp.expiresAt) > new Date()) {
      return { message: 'OTP verified successfully' };
    } else {
      return { message: 'Invalid or expired OTP' };
    }
  }

  @Post('reset-password')
  async resetPassword(@Body('email') email: string, @Body('newPassword') newPassword: string) {
    
    await this.userService.resetPassword(email, newPassword);
    await SendEmail(email, 'Password Reset Confirmation', 'Your password has been reset successfully.');
    return { message: 'Password reset successfully' };  
  }
}
