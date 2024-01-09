import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { PaginationParams } from '../../utils/paginations/type';
import { paginateResponse } from '../../utils/paginations/pagination';
import { Car } from '@prisma/client';

@Injectable()
export class CarService {
  constructor(private readonly prismaService: PrismaService) {
  }
  async create(createCarDto: CreateCarDto) {
    const carAlreadyExists = await this.findCarByPlate(createCarDto.plate);

    if (carAlreadyExists) {
      throw new BadRequestException({
        message: 'car already exists'
      });
    }

    return this.prismaService.car.create({
      data: createCarDto,
    });
  }

  async findAll(pagination?: PaginationParams) {
    if (pagination) {
      const { page, limit } = pagination;

      const count = await this.prismaService.car.count();
      const car = await  this.prismaService.car.findMany({
          skip: (page - 1) * limit,
          take: limit,
          orderBy: {
            createdAt: 'desc',
          },
        });

      return paginateResponse<Car>({
        page,
        limit,
        total: count,
        result: car,
      });
    }
    return this.prismaService.car.findMany({});
  }

  async findCarByPlate(plate: string) {
    return this.prismaService.car.findFirst({
      where: {
        plate,
      },
    });
  }

  async findOne(id: string) {
    return this.prismaService.car.findFirst({
      where: {
        id,
      }
    });
  }

  async update(id: string, updateCarDto: UpdateCarDto) {
    const car = await this.findOne(id);
    if(!car) {
      throw new NotFoundException({
        message: 'car not found'
      });
    }

    return this.prismaService.car.update({
      where: {
        id,
      },
      data: updateCarDto
    });
  }

  async remove(id: string) {
    const car = this.findOne(id);
    if(!car) {
      throw new NotFoundException({
        message: 'car not found'
      });
    }
    return this.prismaService.car.delete({
      where: {
        id,
      }
    });
  }
}