import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { CarModule } from './modules/car/car.module';
import { DriverModule } from './modules/driver/driver.module';
import { PickUpCarModule } from './modules/pick-up-car/pick-up-car.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    CarModule,
    DriverModule,
    PickUpCarModule,
  ],
})
export class AppModule {}