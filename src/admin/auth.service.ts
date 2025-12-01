// auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AdminService } from '../admin/admin.service';

@Injectable()
export class AuthService {
  constructor(private adminService: AdminService, private jwtService: JwtService) {}

  async validateAdmin(username: string, password: string) {
    const admin = await this.adminService.getByUsername(username);
    if (admin && (await bcrypt.compare(password, admin.password))) {
      return admin;
    }
    return null;
  }

  async login(admin: any) {
    const payload = { username: admin.username, sub: admin.id, role: admin.role };
    return { access_token: this.jwtService.sign(payload) };
  }
}
