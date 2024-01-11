import { IsOptional, IsString } from 'class-validator';

export class ReturnedCarPickUpCarDto {
  @IsString()
  @IsOptional()
  deliveryDescription: string;
}
