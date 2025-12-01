import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdminModule } from './admin/admin.module';
import { AdminController } from './admin/admin.controller';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // or mysql, etc.
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '53811942',
      database: 'advwebtech',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AdminModule,],
  controllers: [AppController, AdminController],
  providers: [],
})
export class AppModule {}
