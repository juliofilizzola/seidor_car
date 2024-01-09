import { Test, TestingModule } from '@nestjs/testing';
import { CarService } from './car.service';
import { PrismaService } from '../../prisma/prisma.service';
import { car, carsReturn, prismaMock, updateCar } from '../../mock/prisma.mock';
import { BadRequestException, NotFoundException } from '@nestjs/common';

jest.mock('../../prisma/prisma.service');
describe('CarService', () => {
  let service: CarService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<CarService>(CarService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be defined create', () => {
    expect(service.create).toBeDefined();
  });

  it('should be defined findAll', () => {
    expect(service.findAll).toBeDefined();
  });

  it('should be defined findOne', () => {
    expect(service.findOne).toBeDefined();
  });

  it('should be defined Remove', () => {
    expect(service.remove).toBeDefined();
  });

  it('should be defined findCarByPlate', () => {
    expect(service.findCarByPlate).toBeDefined();
  });

  it('should be defined update', () => {
    expect(service.update).toBeDefined();
  });

  it('find Car by plate', async () => {
    expect(await service.findCarByPlate(car.plate)).toEqual(car);
  });


  it('find Car by id', async () => {
    expect(await service.findCarByPlate(car.id)).toEqual(car);
  });


  it('find Car by plate error', async () => {
    jest.spyOn(prismaService.car, 'findFirst').mockResolvedValue(null);
    expect(await service.findCarByPlate('AAA-bc')).toEqual(null);
  });



  it('find Car by id error', async () => {
    jest.spyOn(prismaService.car, 'findFirst').mockResolvedValue(null);
    expect(await service.findCarByPlate(car.id)).toEqual(null);
  });

  it('create new Car', async () => {
    jest.spyOn(prismaService.car, 'findFirst').mockResolvedValue(null);
    expect(await service.create({
      plate: car.plate,
      brand: car.brand,
      color: car.color,
    })).toEqual(car);
  });

  it('create new Car Error Already exist', async () => {
    jest.spyOn(prismaService.car, 'findFirst').mockResolvedValue(car);

    try {
      await service.create({
        plate: car.plate,
        brand: car.brand,
        color: car.color,
      });
    } catch (e) {

      expect(e).toEqual(new BadRequestException({
        message: 'car already exists'
      }));
    }
  });

  it('update Car', async () => {
    expect(await service.update(car.id, {
      color: 'prata'
    })).toEqual(updateCar);
  });

  it('update car error, car not found', async () => {
    try {
      jest.spyOn(prismaService.car, 'findFirst').mockResolvedValue(null);

      await service.update(car.id, {
        color: 'prata'
      });
    } catch (e) {
      expect(e).toEqual(new NotFoundException({
        message: 'car not found'
      }));
    }
  });

  it('remove Car', async () => {
    expect(await service.remove(car.id)).toEqual(car);
  });

  it('remove car error, car not found', async () => {
    try {
      jest.spyOn(prismaService.car, 'findFirst').mockResolvedValue(null);

      await service.remove(car.id);
    } catch (e) {
      expect(e).toEqual(new NotFoundException({
        message: 'car not found'
      }));
    }
  });

  it('find All', async () => {
    expect(await service.findAll()).toEqual([car]);
  });

  it('find All pagination', async () => {
    expect(await service.findAll({page: 1, limit: 1 })).toEqual(carsReturn);
  });
});