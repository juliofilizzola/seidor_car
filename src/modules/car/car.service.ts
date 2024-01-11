import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { PaginationParams } from '../../utils/paginations/type';
import { paginateResponse } from '../../utils/paginations/pagination';
import { Car, Prisma } from '@prisma/client';

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

  async inUse(id: string) {
    return this.prismaService.car.findFirst({
      where: {
        id,
      },
      select: {
        inUse: true,
      }
    });
  }

  async findAll(pagination?: PaginationParams, query?: { color: string, brand: string}) {
    const baseSearch: Prisma.CarWhereInput = {
      color: {
        contains: query?.color
      },
      brand: query?.brand,
    };

    if (pagination) {
      const { page, limit } = pagination;

      const count = await this.prismaService.car.count({
        where: baseSearch,
      });
      const car = await  this.prismaService.car.findMany({
          where: baseSearch,
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
    return this.prismaService.car.findMany({
      where: baseSearch,
    });
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

    if (updateCarDto?.plate) {
      const carAlreadyExists = await this.findCarByPlate(updateCarDto.plate);
      if (carAlreadyExists) {
        throw new BadRequestException({
          message: 'car already exists'
        });
      }
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
