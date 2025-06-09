import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  async register(@Body() body: CreateUserDto) {
    const user = await this.userService.createUser(body);
    const { password, ...userData } = user;
    return userData;
  }
}
