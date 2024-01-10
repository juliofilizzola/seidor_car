import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePickUpCarDto {
  @IsString({
    message: 'id car is invalid'
  })
  @IsNotEmpty({
    message: 'id car is required'
  })
  idCar: string;

  @IsString({
    message: 'id car is invalid'
  })
  @IsNotEmpty({
    message: 'id driver is required'
  })
  idDriver: string;

  @IsNotEmpty({
    message: 'init pick up is required'
  })
  @Type(() => Date)
  @IsDate()
  initPicKUp: Date;

  @IsString({
    message: 'id car is invalid'
  })
  @IsNotEmpty({})
  description: string;
}
