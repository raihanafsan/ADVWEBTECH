import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from './admin.entity';
import { Admin } from 'typeorm';
import { AdminModule } from './admin.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '53811942',
      database: 'advwebtech',
      entities: [Admin],
      synchronize: true,
    }),AdminDBModule, AdminModule
  ],
})
export class AdminDBModule {}
