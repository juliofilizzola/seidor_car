import { Module } from '@nestjs/common';
import { PickUpCarService } from './pick-up-car.service';
import { PickUpCarController } from './pick-up-car.controller';

@Module({
  controllers: [PickUpCarController],
  providers: [PickUpCarService],
})
export class PickUpCarModule {}
