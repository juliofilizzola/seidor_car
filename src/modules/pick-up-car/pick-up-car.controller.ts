import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { PickUpCarService } from './pick-up-car.service';
import { CreatePickUpCarDto } from './dto/create-pick-up-car.dto';
import { UpdatePickUpCarDto } from './dto/update-pick-up-car.dto';
import { PaginationParams } from '../../utils/paginations/type';
import { QuerySearchPickUpCarDto } from './dto/query-search-pick-up-car.dto';
import { ReturnedCarPickUpCarDto } from './dto/returned-car-pick-up-car.dto';

@Controller('pick-up-car')
export class PickUpCarController {
  constructor(private readonly pickUpCarService: PickUpCarService) {}

  @Post()
  create(@Body() createPickUpCarDto: CreatePickUpCarDto) {
    return this.pickUpCarService.create(createPickUpCarDto);
  }

  @Put('returned/:id')
  returned(@Body() updatePickUpCarDto: ReturnedCarPickUpCarDto, @Param('id') id: string) {
    return this.pickUpCarService.returnedCar(id, updatePickUpCarDto);
  }
  @Get()
  findAll(@Query() { page, limit, name, color, brand }: PaginationParams & QuerySearchPickUpCarDto) {
    const pagination: PaginationParams =
      page && limit ? { page: Number(page), limit: Number(limit) } : undefined;

    return this.pickUpCarService.findAll(pagination, { name, color, brand });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pickUpCarService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePickUpCarDto: UpdatePickUpCarDto) {
    return this.pickUpCarService.update(id, updatePickUpCarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pickUpCarService.remove(id);
  }
}
