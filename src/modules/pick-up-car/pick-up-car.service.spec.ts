import { Test, TestingModule } from '@nestjs/testing';
import { PickUpCarService } from './pick-up-car.service';
import {
  carMock,
  driver,
  pickUpCarMock,
  prismaMock,
  updatePickUpCarMock,
  updatePickUpCarReturn
} from '../../mock/prisma.mock';
import { NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CarService } from '../car/car.service';
import { DriverService } from '../driver/driver.service';

jest.mock('../../prisma/prisma.service');

describe('PickUpCarService', () => {
  let service: PickUpCarService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PickUpCarService,
        DriverService,
        CarService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<PickUpCarService>(PickUpCarService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });


  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be defined create driver', () => {
    expect(service.create).toBeDefined();
  });

  it('should be defined findAll driver', () => {
    expect(service.findAll).toBeDefined();
  });

  it('should be defined findOne driver', () => {
    expect(service.findOne).toBeDefined();
  });

  it('should be defined Remove driver', () => {
    expect(service.remove).toBeDefined();
  });

  it('should be defined returned', () => {
    expect(service.returnedCar).toBeDefined();
  });

  it('should be defined update pick up car', () => {
    expect(service.update).toBeDefined();
  });

  it('find pick up car by id', async () => {
    expect(await service.findOne(pickUpCarMock.id)).toEqual(pickUpCarMock);
  });


  it('fin pick up car by id error', async () => {
    jest.spyOn(prismaService.pickUpCar, 'findFirst').mockResolvedValue(null);
    expect(await service.findOne(pickUpCarMock.id)).toEqual(null);
  });

  it('create new pick up car', async () => {
    jest.spyOn(prismaService.car, 'findFirst').mockResolvedValue({
      ...carMock,
      inUse: false,
    });
    jest.spyOn(prismaService.driver, 'findFirst').mockResolvedValue(driver);
    expect(await service.create({
      description: pickUpCarMock.description,
      initPicKUp: pickUpCarMock.initPickUp,
      idDriver: pickUpCarMock.driverId,
      idCar:pickUpCarMock.carId,
      endPickUp: pickUpCarMock.endPickUp
    })).toEqual(pickUpCarMock);
  });

  it('create new pick up car, Error car not found', async () => {
    jest.spyOn(prismaService.driver, 'findFirst').mockResolvedValue(driver);
    jest.spyOn(prismaService.car, 'findFirst').mockResolvedValue(null);

    try {
      await service.create({
        description: pickUpCarMock.description,
        initPicKUp: pickUpCarMock.initPickUp,
        idDriver: pickUpCarMock.driverId,
        idCar:pickUpCarMock.carId,
        endPickUp: pickUpCarMock.endPickUp
      });
    } catch (e) {

      expect(e).toEqual(new NotFoundException({
        message: 'Car not found'
      }));
    }
  });

  it('create new pick up car, Error Driver not found', async () => {
    jest.spyOn(prismaService.driver, 'findFirst').mockResolvedValue(null);
    jest.spyOn(prismaService.car, 'findFirst').mockResolvedValue({
      ...carMock,
      inUse: false,
    });

    try {
      await service.create({
        description: pickUpCarMock.description,
        initPicKUp: pickUpCarMock.initPickUp,
        idDriver: pickUpCarMock.driverId,
        idCar:pickUpCarMock.carId,
        endPickUp: pickUpCarMock.endPickUp
      });
    } catch (e) {

      expect(e).toEqual(new NotFoundException({
        message: 'Driver not found'
      }));
    }
  });

  it('update driver', async () => {
    jest.spyOn(prismaService.pickUpCar, 'findFirst').mockResolvedValue(pickUpCarMock);
    expect(await service.update(pickUpCarMock.id, {
      endPickUp: updatePickUpCarMock.endPickUp,
      description: updatePickUpCarMock.description,
    })).toEqual(updatePickUpCarMock);
  });

  it('update driver error, driver not found', async () => {
    try {
      jest.spyOn(prismaService.pickUpCar, 'findFirst').mockResolvedValue(null);

      await service.update(pickUpCarMock.id, {
        description: updatePickUpCarMock.description,
      });
    } catch (e) {
      expect(e).toEqual(new NotFoundException({
        message: 'PickUpCar not found'
      }));
    }
  });

  it('remove pick up car', async () => {
    jest.spyOn(prismaService.pickUpCar, 'findFirst').mockResolvedValue(pickUpCarMock);

    expect(await service.remove(pickUpCarMock.id)).toEqual(pickUpCarMock);
  });

  it('remove pick up car error, pickUpCar not found', async () => {
    try {
      jest.spyOn(prismaService.pickUpCar, 'findFirst').mockResolvedValue(null);

      await service.remove(pickUpCarMock.id);
    } catch (e) {
      expect(e).toEqual(new NotFoundException({
        message: 'PickUpCar not found'
      }));
    }
  });

  it('find All', async () => {
    expect(await service.findAll()).toEqual([pickUpCarMock]);
  });

  it('find All pagination', async () => {
    expect(await service.findAll({page: 1, limit: 1 })).toEqual(updatePickUpCarReturn);
  });
});