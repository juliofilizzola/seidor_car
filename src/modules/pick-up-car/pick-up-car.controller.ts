import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PickUpCarService } from './pick-up-car.service';
import { CreatePickUpCarDto } from './dto/create-pick-up-car.dto';
import { UpdatePickUpCarDto } from './dto/update-pick-up-car.dto';

@Controller('pick-up-car')
export class PickUpCarController {
  constructor(private readonly pickUpCarService: PickUpCarService) {}

  @Post()
  create(@Body() createPickUpCarDto: CreatePickUpCarDto) {
    return this.pickUpCarService.create(createPickUpCarDto);
  }

  @Get()
  findAll() {
    return this.pickUpCarService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pickUpCarService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePickUpCarDto: UpdatePickUpCarDto) {
    return this.pickUpCarService.update(+id, updatePickUpCarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pickUpCarService.remove(+id);
  }
}
