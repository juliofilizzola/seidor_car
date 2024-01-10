import { PartialType } from '@nestjs/mapped-types';
import { CreatePickUpCarDto } from './create-pick-up-car.dto';
import { Exclude } from 'class-transformer';

export class UpdatePickUpCarDto extends PartialType(CreatePickUpCarDto) {
  @Exclude()
  idCar: string;
  @Exclude()
  idDriver: string;
  @Exclude()
  initPicKUp: Date;
}