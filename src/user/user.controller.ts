import { Controller, Post, Body } from '@nestjs/common';
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
}
