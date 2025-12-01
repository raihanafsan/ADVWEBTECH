import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin, Repository } from 'typeorm';
import { AdminEntity } from './admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private repo: Repository<AdminEntity>,
  ) {}
  private admins: any[] = [];
   findAll() {
    return this.admins;
  }

  findById(id: number) {
    return this.admins.find(a => a.id === id);
  }
  
  update(id: number, data: any) {
    const index = this.admins.findIndex(a => a.id === id);
    this.admins[index] = { ...this.admins[index], ...data };
    return this.admins[index];
  }
   // 6️⃣ Change Role
  async changeRole(id: number, role: string) {
    const admin = await this.findById(id);
    admin.role = role;
    return await this.repo.save(admin);
  }

  // 7️⃣ Suspend Admin
  async suspend(id: number) {
    const admin = await this.findById(id);
    admin.isSuspended = true;
    return await this.repo.save(admin);
  }

  // 8️⃣ Delete Admin
  async delete(id: number) {
    const admin = await this.findById(id);
    await this.repo.remove(admin);
    return { message: 'Admin deleted successfully' };
  }
   // CREATE USER
  async create(dto: CreateAdminDto) {
    const user = this.repo.create(dto);
    return await this.repo.save(user);
  }

  // RETRIEVE USERS WHOSE FULLNAME CONTAINS A SUBSTRING
  async searchByFullName(substring: string) {
    return await this.repo
      .createQueryBuilder('user')
      .where('LOWER(user.fullName) LIKE :filter', {
        filter: `%${substring.toLowerCase()}%`,
      })
      .getMany();
  }

  // RETRIEVE USER BASED ON UNIQUE USERNAME
  async getByUsername(username: string) {
    const user = await this.repo.findOne({ where: { username } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  // REMOVE A USER BASED ON UNIQUE USERNAME
  async deleteByUsername(username: string) {
    const user = await this.getByUsername(username);
    return await this.repo.remove(user);
  }}

  
