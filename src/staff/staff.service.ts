import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Staff } from 'src/staff/staff.entity';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff)
    private readonly staffRepo: Repository<Staff>,
  ) {}

  async create(dto: CreateStaffDto): Promise<Staff> {
    const newStaff = this.staffRepo.create(dto);
    return this.staffRepo.save(newStaff);
  }

  findAll(): Promise<Staff[]> {
    return this.staffRepo.find();
  }

  async update(id: number, dto: UpdateStaffDto): Promise<Staff> {
    const staff = await this.staffRepo.findOne({ where: { id } });
    if (!staff) throw new NotFoundException('Staff not found');
    Object.assign(staff, dto);
    return this.staffRepo.save(staff);
  }

  async delete(id: number): Promise<void> {
    const result = await this.staffRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Staff not found');
  }
}
