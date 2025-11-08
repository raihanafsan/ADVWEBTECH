import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';

@Injectable()
export class AdminService {
  private admins: any[] = [];

  create(data: CreateAdminDto) {
    const newAdmin = { id: Date.now(), ...data, role: data.role || 'manager' };
    this.admins.push(newAdmin);
    return { success: true, message: 'Admin created successfully', admin: newAdmin };
  }

  findAll() {
    return { success: true, admins: this.admins };
  }

  findById(id: number) {
    const admin = this.admins.find((a) => a.id === id);
    if (!admin) throw new NotFoundException('Admin not found');
    return { success: true, admin };
  }

  findByEmail(email: string) {
    const admin = this.admins.find((a) => a.email === email);
    if (!admin) throw new NotFoundException('Admin not found');
    return { success: true, admin };
  }

  update(id: number, data: CreateAdminDto) {
    const idx = this.admins.findIndex((a) => a.id === id);
    if (idx === -1) throw new NotFoundException('Admin not found');
    this.admins[idx] = { ...this.admins[idx], ...data };
    return { success: true, message: 'Admin updated', admin: this.admins[idx] };
  }

  changeRole(id: number, role: string) {
    const admin = this.admins.find((a) => a.id === id);
    if (!admin) throw new NotFoundException('Admin not found');
    admin.role = role;
    return { success: true, message: 'Role updated', admin };
  }

  suspend(id: number) {
    const admin = this.admins.find((a) => a.id === id);
    if (!admin) throw new NotFoundException('Admin not found');
    admin.suspended = true;
    return { success: true, message: 'Admin suspended', admin };
  }

  delete(id: number) {
    const idx = this.admins.findIndex((a) => a.id === id);
    if (idx === -1) throw new NotFoundException('Admin not found');
    const removed = this.admins.splice(idx, 1)[0];
    return { success: true, message: 'Admin deleted', admin: removed };
  }
}
