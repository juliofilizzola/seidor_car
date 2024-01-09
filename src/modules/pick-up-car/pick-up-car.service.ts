import { Injectable } from '@nestjs/common';
import { CreatePickUpCarDto } from './dto/create-pick-up-car.dto';
import { UpdatePickUpCarDto } from './dto/update-pick-up-car.dto';

@Injectable()
export class PickUpCarService {
  create(createPickUpCarDto: CreatePickUpCarDto) {
    return 'This action adds a new pickUpCar';
  }

  findAll() {
    return `This action returns all pickUpCar`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pickUpCar`;
  }

  update(id: number, updatePickUpCarDto: UpdatePickUpCarDto) {
    return `This action updates a #${id} pickUpCar`;
  }

  remove(id: number) {
    return `This action removes a #${id} pickUpCar`;
  }
}
