import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile, UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import * as fs from 'fs';

@Controller('admins')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        callback(null, uniqueSuffix + extname(file.originalname));
      },
    }),
    fileFilter: (req, file, callback) => {
      if (file.mimetype !== 'application/pdf') {
        return callback(new Error('Only PDF files are allowed!'), false);
      }
      callback(null, true);
    },
  }
))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return { message: 'File uploaded successfully!', file: file.filename };
  }


  // 1️⃣ Create Admin
  @Post('create')
  create(@Body() dto: CreateAdminDto) {
    return this.adminService.create(dto);
  }

  // 2️⃣ Get All Admins
  @Get()
  findAll() {
    //return ['Admin 1hh', 'Admin 2', 'Admin 3'];
    return this.adminService.findAll();
  }

  // 3️⃣ Get Admin by ID
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.findById(id);
  }

  // 4️⃣ Get Admin by Email
  @Get('search/by-email')
  findByEmail(@Query('email') email: string) {
    return this.adminService.findByEmail(email);
  }

  // 5️⃣ Update Admin (PUT)
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateAdminDto) {
    return this.adminService.update(id, dto);
  }

  // 6️⃣ Patch Role
  @Patch(':id/role')
  changeRole(@Param('id', ParseIntPipe) id: number, @Query('role') role: string) {
    return this.adminService.changeRole(id, role);
  }

  // 7️⃣ Suspend Admin
  @Patch(':id/suspend')
  suspend(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.suspend(id);
  }

  // 8️⃣ Delete Admin
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.delete(id);
  }
}
