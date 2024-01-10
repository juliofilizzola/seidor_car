import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCarDto {
  @IsString({
    message: 'plate is invalid'
  })
  @IsNotEmpty({
    message: 'plate is required'
  })
  plate: string;
  @IsString({
    message: 'color is invalid'
  })
  @IsNotEmpty({
    message: 'color is required'
  })
  color: string;

  @IsString({
    message: 'brand is invalid'
  })
  @IsNotEmpty({
    message: 'brand is required'
  })
  brand: string;
}