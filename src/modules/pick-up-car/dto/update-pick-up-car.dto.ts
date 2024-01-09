import { PartialType } from '@nestjs/mapped-types';
import { CreatePickUpCarDto } from './create-pick-up-car.dto';

export class UpdatePickUpCarDto extends PartialType(CreatePickUpCarDto) {}
