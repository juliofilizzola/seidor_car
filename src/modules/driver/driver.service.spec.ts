import { Test, TestingModule } from '@nestjs/testing';
import { DriverService } from './driver.service';
import { driver, driverReturn, prismaMock, updateDriver } from '../../mock/prisma.mock';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

describe('DriverService', () => {
  let service: DriverService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DriverService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        }
      ],
    }).compile();

    service = module.get<DriverService>(DriverService);
    prismaService = module.get<PrismaService>(PrismaService);
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

  it('should be defined findDriveByEmail', () => {
    expect(service.findByEmail).toBeDefined();
  });

  it('should be defined update driver', () => {
    expect(service.update).toBeDefined();
  });

  it('find driver by email', async () => {
    expect(await service.findByEmail(driver.email)).toEqual(driver);
  });


  it('find driver by id', async () => {
    expect(await service.findOne(driver.id)).toEqual(driver);
  });


  it('find driver by email error', async () => {
    jest.spyOn(prismaService.driver, 'findFirst').mockResolvedValue(null);
    expect(await service.findOne('AAA-bc')).toEqual(null);
  });

  it('find driver by id error', async () => {
    jest.spyOn(prismaService.driver, 'findFirst').mockResolvedValue(null);
    expect(await service.findOne(driver.id)).toEqual(null);
  });

  it('create new driver', async () => {
    jest.spyOn(prismaService.driver, 'findFirst').mockResolvedValue(null);
    expect(await service.create({
      email: driver.email,
      license: driver.license,
      name: driver.name,
      phone: driver.phone,
      document: driver.document,
    })).toEqual(driver);
  });

  it('create new driver Error Already exist', async () => {
    jest.spyOn(prismaService.driver, 'findFirst').mockResolvedValue(driver);

    try {
      await service.create({
        email: driver.email,
        license: driver.license,
        name: driver.name,
        phone: driver.phone,
        document: driver.document,
      });
    } catch (e) {

      expect(e).toEqual(new BadRequestException({
        message: 'Driver already exist'
      }));
    }
  });

  it('update driver', async () => {
    expect(await service.update(driver.id, {
      name: 'fulano de tal'
    })).toEqual(updateDriver);
  });

  it('update driver error, driver not found', async () => {
    try {
      jest.spyOn(prismaService.car, 'findFirst').mockResolvedValue(null);

      await service.update(driver.id, {
        name: 'fulano de tal'
      });
    } catch (e) {
      expect(e).toEqual(new NotFoundException({
        message: 'Driver not found'
      }));
    }
  });

  it('update driver error, Driver already exist', async () => {
    try {
      await service.update(driver.id, {
        name: 'fulano de tal',
        email: driver.email,
      });
    } catch (e) {
      expect(e).toEqual(new BadRequestException({
        message: 'Driver already exist'
      }));
    }
  });

  it('remove driver', async () => {
    expect(await service.remove(driver.id)).toEqual(driver);
  });

  it('remove car error, driver not found', async () => {
    try {
      jest.spyOn(prismaService.driver, 'findFirst').mockResolvedValue(null);

      await service.remove(driver.id);
    } catch (e) {
      expect(e).toEqual(new NotFoundException({
        message: 'Driver not found'
      }));
    }
  });

  it('find All', async () => {
    expect(await service.findAll()).toEqual([driver]);
  });

  it('find All pagination', async () => {
    expect(await service.findAll({page: 1, limit: 1 })).toEqual(driverReturn);
  });
});