import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarModule } from './car/car.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [CarModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
