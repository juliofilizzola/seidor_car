import { Module } from '@nestjs/common';
import { PickUpCarService } from './pick-up-car.service';
import { PickUpCarController } from './pick-up-car.controller';
import { DriverService } from '../driver/driver.service';
import { CarService } from '../car/car.service';

@Module({
  controllers: [PickUpCarController],
  providers: [
    PickUpCarService,
    DriverService,
    CarService
  ],
})
export class PickUpCarModule {}
