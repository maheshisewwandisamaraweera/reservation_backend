import { Injectable } from '@nestjs/common';

@Injectable()
export class ProfilesService {
  private profiles = [];

  findById(userId: string) {
    return this.profiles.find(p => p.userId === userId);
  }

  update(userId: string, updateData: any) {
    const index = this.profiles.findIndex(p => p.userId === userId);
    if (index >= 0) {
      this.profiles[index] = { ...this.profiles[index], ...updateData };
    }
    return { message: 'Profile updated' };
  }
}
