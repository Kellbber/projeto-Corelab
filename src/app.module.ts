import { Module } from '@nestjs/common';
import { CarModule } from './car/car.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [CarModule, PrismaModule],
})
export class AppModule {}
