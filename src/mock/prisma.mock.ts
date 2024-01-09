import { Car, Driver } from '@prisma/client';
import { IPagination } from '../utils/paginations/pagination';

export const car: Car = {
  id: '14087e68-e669-482b-b908-bc33623a036d',
  brand:  'Ford',
  color:  'black',
  plate:   'ABC-1234',
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};

export const updateCar: Car = {
  id: '14087e68-e669-482b-b908-bc33623a036d',
  brand:  'Ford',
  color:  'prata',
  plate:   'ABC-1234',
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};

export const carsReturn: IPagination<Car> = {
  data: [car],
  count: 1,
  currentPage: 1,
  totalList: 1,
  nextPage: null,
  prevPage: null
};


export const updateDriver: Driver = {
  id: '14087e68-e669-482b-b908-bc33623a036d',
  name:  'fulano de tal',
  document:  '00000000000',
  license:   'ABC-1234',
  driving:  false,
  email:     'email@test.com',
  phone: '31999999999',
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};

export const driver: Driver = {
  id: '14087e68-e669-482b-b908-bc33623a036d',
  name:  'Fulano',
  document:  '00000000000',
  license:   'ABC-1234',
  driving:  false,
  email:     'email@test.com',
  phone: '31999999999',
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};

export const driverReturn: IPagination<Driver> = {
  data: [driver],
  count: 1,
  currentPage: 1,
  totalList: 1,
  nextPage: null,
  prevPage: null
};


export const prismaMock = {
  car: {
    create: jest.fn().mockReturnValue(car),
    findMany: jest.fn().mockResolvedValue([car]),
    findFirst: jest.fn().mockResolvedValue(car),
    delete: jest.fn().mockResolvedValue(car),
    update: jest.fn().mockResolvedValue(updateCar),
    count: jest.fn().mockResolvedValue([car].length)
  },
  driver: {
    create: jest.fn().mockReturnValue(driver),
    findMany: jest.fn().mockResolvedValue([driver]),
    findFirst: jest.fn().mockResolvedValue(driver),
    delete: jest.fn().mockResolvedValue(driver),
    update: jest.fn().mockResolvedValue(updateDriver),
    count: jest.fn().mockResolvedValue([driver].length)
  }
};