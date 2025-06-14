import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(data: CreateUserDto): Promise<{ user: Partial<User>, token: string }> {
    const existing = await this.userRepo.findOne({ where: { email: data.email } });
    if (existing) throw new ConflictException('Email already in use');

    const hash = await bcrypt.hash(data.password, 10);
    const newUser = this.userRepo.create({ ...data, password: hash });
    await this.userRepo.save(newUser);

    const { password, ...userData } = newUser;
    const token = this.jwtService.sign({ sub: newUser.id, username: newUser.username });

    return { user: userData, token };
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepo.findOne({ where: { email } });
  }

  async findByUsername(username: string): Promise<User> {
    return this.userRepo.findOne({ where: { username } });
  }

  async loginUser(username: string, password: string): Promise<{ user: Partial<User>, token: string }> {
    const user = await this.findByUsername(username);
    if (!user) throw new ConflictException('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new ConflictException('Invalid credentials');

    const { password: _, ...userData } = user;
    const token = this.jwtService.sign({ sub: user.id, username: user.username });

    return { user: userData, token };
  }
}
