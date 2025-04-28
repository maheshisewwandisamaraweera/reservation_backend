import { Injectable } from '@nestjs/common';

@Injectable()
export class ServicesService {
  private services = [
    { id: 1, name: 'Haircut', price: 1000 },
    { id: 2, name: 'Facial', price: 2500 },
  ];

  getAll() {
    return this.services;
  }
}
