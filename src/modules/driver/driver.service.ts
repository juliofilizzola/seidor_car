import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { PaginationParams } from '../../utils/paginations/type';
import { paginateResponse } from '../../utils/paginations/pagination';
import { Driver, Prisma } from '@prisma/client';
import { formatDocument } from '../../utils/format/format-document';
import { validDocument } from '../../utils/validation/valid-document';

@Injectable()
export class DriverService {

  constructor(private readonly prismaService: PrismaService) {
  }
  async create(createDriverDto: CreateDriverDto) {
    const driverAlreadyExist = await this.findByEmail(createDriverDto.email);

    if (driverAlreadyExist) {
      throw new BadRequestException({
        message: 'Driver already exist',
      });
    }
    const document = validDocument(createDriverDto.document);

    if (!document) {
      throw new BadRequestException({
        message: 'Invalid document',
      });
    }

    createDriverDto.document = formatDocument(createDriverDto.document);

    return this.prismaService.driver.create({
      data: createDriverDto,
    });
  }

  async findAll(pagination?: PaginationParams, query?: { name: string }) {
    const baseSearch: Prisma.DriverWhereInput = {
      name: {
        contains: query?.name,
      }
    };

    if (pagination) {
      const { page, limit } = pagination;
      const offset = (page - 1) * limit;

      const count = await this.prismaService.driver.count({
        where: baseSearch
      });
      const drivers = await this.prismaService.driver.findMany({
        where: baseSearch,
        skip: offset,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      });

      return paginateResponse<Driver>({
        page,
        limit,
        total: count,
        result: drivers,
      });
    }

    return this.prismaService.driver.findMany({
      where: baseSearch
    });
  }

  async findOne(id: string) {
    return this.prismaService.driver.findFirst({
      where: {
        id,
      }
    });
  }

  async findByEmail(email: string) {
    return this.prismaService.driver.findFirst({
      where: {
        email,
      }
    });
  }
  async update(id: string, updateDriverDto: UpdateDriverDto) {
    const driver = await this.findOne(id);

    if (!driver) {
      throw new NotFoundException({
        message: 'Driver not found',
      });
    }

    if (updateDriverDto?.email) {
      const driverAlreadyExist = await this.findByEmail(updateDriverDto.email);

      if (driverAlreadyExist) {
        throw new BadRequestException({
          message: 'Driver already exist',
        });
      }
    }
    if (updateDriverDto?.document) {
      const document = validDocument(updateDriverDto?.document);

      if (!document) {
        throw new BadRequestException({
          message: 'Invalid document',
        });
      }
      updateDriverDto.document = formatDocument(updateDriverDto?.document);
    }

    return this.prismaService.driver.update({
      where: {id},
      data: updateDriverDto,
    });
  }

  async inDriver(id: string) {
    return this.prismaService.driver.findFirst({
      where: {
        id,
      },
      select: {
        driving: true
      }
    });
  }

  async remove(id: string) {
    const driver = await this.findOne(id);

    if (!driver) {
      throw new NotFoundException({
        message: 'Driver not found',
      });
    }

    return this.prismaService.driver.delete({
      where: {
        id,
      }
    });
  }
}
