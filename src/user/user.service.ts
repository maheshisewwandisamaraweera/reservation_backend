import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) { }

  async createUser(data: CreateUserDto): Promise<{ user: Partial<User>, token: string }> {
    const existing = await this.userRepo.findOne({ where: { email: data.email } });
    if (existing) throw new ConflictException('Email already in use');

    const hash = await bcrypt.hash(data.password, 10);
    const newUser = this.userRepo.create({ ...data, password: hash });

    // check the user role and set the default status
    if (data.role === 'client') {
      newUser.status = 'active';
      newUser.role = UserRole.CLIENT;
    } else if (data.role === 'serviceProviderAdmin') {
      newUser.status = 'pending';
      newUser.role = UserRole.SERVICE_PROVIDER_ADMIN;
    } else if (data.role === 'serviceProviderStaff') {
      newUser.status = 'pending';
      newUser.role = UserRole.SERVICE_PROVIDER_STAFF;
    } else {
      console.error('Invalid user role:', data.role);
      throw new ConflictException('Invalid user role');

    }
    console.log('User status set to:', newUser);
    await this.userRepo.save(newUser);

    const { password, ...userData } = newUser;
    // generate the token if the account is active
    if (newUser.status !== 'active') {
      return { user: userData, token: '' };
    }
    const payload = { sub: userData.id, username: userData.username, role: userData.role };
    const token = this.jwtService.sign(payload);

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

    if (user.status !== 'active') {
      throw new ConflictException('Account is not active');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new ConflictException('Invalid credentials');

    const { password: _, ...userData } = user;
    const payload = { sub: user.id, username: user.username, role: user.role };
    const token = this.jwtService.sign(payload);

    return { user: userData, token };
  }

  async findByUserId(userId: string): Promise<User> {
    return this.userRepo.findOne({ where: { id: Number(userId) } });
  }

  async updateUser(userId: string, data: Partial<CreateUserDto>): Promise<User> {
    const user = await this.findByUserId(userId);
    if (!user) throw new ConflictException('User not found');

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    Object.assign(user, data);
    return this.userRepo.save(user);
  }

  async findAllUsers(): Promise<User[]> {
    return this.userRepo.find();
  }

  async updateUserStatus(userId: string, status: string): Promise<User> {
    const user = await this.findByUserId(userId);
    if (!user) throw new ConflictException('User not found');

    user.status = status;
    return this.userRepo.save(user);
  }
  
  async findBusinessNames(): Promise<Partial<User>[]> {
    return this.userRepo.find({
      select: ['id', 'businessName', 'businessType'],
      where: { role: UserRole.SERVICE_PROVIDER_ADMIN },
    });
  }

  async findStaffListByBusinessName(businessName: string): Promise<User[]> {
    return this.userRepo.find({
      where: { businessName, role: UserRole.SERVICE_PROVIDER_STAFF },
      relations: ['services'],
    });
  }

  async updateStaffUserStatus(userId: string): Promise<User> {
    const user = await this.findByUserId(userId);
    if (!user) throw new ConflictException('User not found');

    if (user.role !== UserRole.SERVICE_PROVIDER_STAFF) {
      throw new ConflictException('User is not a service provider staff');
    }

    user.status = 'active';
    return this.userRepo.save(user);
  }

  async removeStaffUser(userId: string): Promise<User> {
    const user = await this.findByUserId(userId);
    if (!user) throw new ConflictException('User not found');

    if (user.role !== UserRole.SERVICE_PROVIDER_STAFF) {
      throw new ConflictException('User is not a service provider staff');
    }

    user.status = 'hold';
    return this.userRepo.save(user);
  }
}
