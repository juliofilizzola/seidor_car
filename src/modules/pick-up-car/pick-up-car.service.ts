import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePickUpCarDto } from './dto/create-pick-up-car.dto';
import { UpdatePickUpCarDto } from './dto/update-pick-up-car.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { DriverService } from '../driver/driver.service';
import { CarService } from '../car/car.service';
import { PaginationParams } from '../../utils/paginations/type';
import { paginateResponse } from '../../utils/paginations/pagination';
import { PickUpCar, Prisma } from '@prisma/client';
import { QuerySearchPickUpCarDto } from './dto/query-search-pick-up-car.dto';
import { ReturnedCarPickUpCarDto } from './dto/returned-car-pick-up-car.dto';

@Injectable()
export class PickUpCarService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly driverService: DriverService,
    private readonly carService: CarService,
  ) {}
  async create(createPickUpCarDto: CreatePickUpCarDto) {
    const validationDriver = await this.driverService.inDriver(createPickUpCarDto.idDriver);
    if (!validationDriver) {
      throw new NotFoundException({
        message: 'Driver not found'
      });
    } else if (validationDriver.driving) {
      throw new BadRequestException({
        message: 'driver already has a car'
      });
    }

    const validationCar = await this.carService.inUse(createPickUpCarDto.idCar);
    if (!validationCar) {
      throw new NotFoundException({
        message: 'Car not found'
      });
    } else if (validationCar.inUse) {
      throw new BadRequestException({
        message: 'car already in use'
      });
    }

    return this.prismaService.pickUpCar.create({
      data: {
        description: createPickUpCarDto.description,
        car: {
          connect: {
            id: createPickUpCarDto.idCar,
          }
        },
        endPickUp: createPickUpCarDto.endPickUp,
        initPickUp: createPickUpCarDto.initPicKUp,
        driver: {
          connect: {
            id: createPickUpCarDto.idDriver,
          }
        }
      },
    });

  }

  async returnedCar(id: string, updatePickUpCarDto: ReturnedCarPickUpCarDto) {
    const pickUpCar = await this.findOne(id);

    if (!pickUpCar) {
      throw new NotFoundException({
        message: 'PickUpCar not found'
      });
    }

    return this.prismaService.pickUpCar.update({
      where: {
        id,
      },
      data: {
        deliveryDescription:  updatePickUpCarDto.deliveryDescription,
        returnedCar: true,
        car: {
          update: {
            where: {
              id: pickUpCar.carId
            },
            data: {
              inUse: false,
            }
          }
        },
        driver: {
          update: {
            where:{
              id: pickUpCar.driverId,
            },
            data: {
              driving: false,
            }
          }
        }
      }
    });
  }
  async findAll(pagination?: PaginationParams, query?: QuerySearchPickUpCarDto) {
    const baseSearch: Prisma.PickUpCarWhereInput  = {
      car: {
        brand: query?.brand,
        color: query?.color,
      },
      driver: {
        name: query?.name,
      }
    };

    const baseInclude: Prisma.PickUpCarInclude = {
      car: true,
      driver: true,
    };

    if (pagination) {
      const { page, limit } = pagination;
      const offset = (page - 1) * limit;

      const count = await this.prismaService.pickUpCar.count({
        where: baseSearch,
      });
      const pickUpCars = await this.prismaService.pickUpCar.findMany({
        where: baseSearch,
        skip: offset,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
        include: baseInclude
      });

      return paginateResponse<PickUpCar>({
        page,
        limit,
        result: pickUpCars,
        total: count,
      });
    }

    return this.prismaService.pickUpCar.findMany({
      where: baseSearch,
      include: baseInclude
    });
  }

  async findOne(id: string) {
    return this.prismaService.pickUpCar.findFirst({
      where: {
        id,
      }
    });
  }

  async update(id: string, updatePickUpCarDto: UpdatePickUpCarDto) {
    const pickUpCar = await this.findOne(id);
    if (!pickUpCar) {
      throw new NotFoundException({
        message: 'PickUpCar not found'
      });
    }


    return this.prismaService.pickUpCar.update({
      where: {
        id,
      },
      data: updatePickUpCarDto,
    });
  }

  async remove(id: string) {
    const pickUpCar = await this.findOne(id);
    if (!pickUpCar) {
      throw new NotFoundException({
        message: 'PickUpCar not found'
      });
    }
    return this.prismaService.pickUpCar.delete({
      where: {
        id
      }
    });
  }
}