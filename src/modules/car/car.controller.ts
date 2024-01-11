import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { PaginationParams } from '../../utils/paginations/type';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  create(@Body() createCarDto: CreateCarDto) {
    return this.carService.create(createCarDto);
  }

  @Get()
  findAll(@Query() { page, limit, color, brand }: PaginationParams & { color: string, brand: string }) {
    const pagination: PaginationParams =
      page && limit ? { page: Number(page), limit: Number(limit) } : undefined;
    return this.carService.findAll(pagination, { color, brand });
  }
  @Get('in-use/:id')
  findInUse(@Param('id') id: string) {
    return this.carService.inUse(id);
  }
  @Get('find-by-plate/:plate')
  findByPlate(@Param('plate') plate: string) {
    return this.carService.findCarByPlate(plate);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carService.update(id, updateCarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carService.remove(id);
  }
}
