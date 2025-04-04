import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/clients.entity';
import * as bcrypt from 'bcryptjs';
import { Client as ClientInterface } from './clients.interface';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async create(data: ClientInterface): Promise<Client> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const client = this.clientRepository.create({ ...data, password: hashedPassword });
    return this.clientRepository.save(client);
  }

  async findOneByEmail(email: string): Promise<Client | null> {
    const client = await this.clientRepository.findOne({ where: { email } });
    return client;
  }

  async updateClient(id: number, data: Partial<ClientInterface>): Promise<Client> {
    const client = await this.clientRepository.findOne({ where: { id } });
  
    if (!client) {
      throw new Error(`Client with ID ${id} not found`);
    }
  
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
  
    Object.assign(client, data);
    return this.clientRepository.save(client);
  }
}  
