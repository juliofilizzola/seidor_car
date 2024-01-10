import { Car, Driver, PickUpCar } from '@prisma/client';
import { IPagination } from '../utils/paginations/pagination';
import { addDays } from 'date-fns';

export const carMock: Car = {
  id: '14087e68-e669-482b-b908-bc33623a036d',
  brand:  'Ford',
  color:  'black',
  plate:   'ABC-1234',
  inUse: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};

export const updateCarMock: Car = {
  id: '14087e68-e669-482b-b908-bc33623a036d',
  brand:  'Ford',
  color:  'prata',
  plate:   'ABC-1234',
  inUse: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};

export const carsReturn: IPagination<Car> = {
  data: [carMock],
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


export const pickUpCarMock: PickUpCar = {
  id: '14087e68-e669-482b-b908-bc33623a036d',
  carId: carMock.id,
  driverId: driver.id,
  endPickUp: addDays(new Date(), 1),
  initPickUp: new Date(),
  returnedCar: false,
  description: 'levar o chefe no trabalho',
  deliveryDescription: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};

export const updatePickUpCarMock: PickUpCar = {
  id: '14087e68-e669-482b-b908-bc33623a036d',
  carId: carMock.id,
  driverId: driver.id,
  endPickUp: addDays(new Date(), 4),
  initPickUp: new Date(),
  returnedCar: false,
  description: 'levar o chefe no trabalho nessa semana',
  deliveryDescription: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};

export const updatePickUpCarReturn: IPagination<PickUpCar> = {
  data: [pickUpCarMock],
  count: 1,
  currentPage: 1,
  totalList: 1,
  nextPage: null,
  prevPage: null
};

export const prismaMock = {
  car: {
    create: jest.fn().mockReturnValue(carMock),
    findMany: jest.fn().mockResolvedValue([carMock]),
    findFirst: jest.fn().mockResolvedValue(carMock),
    delete: jest.fn().mockResolvedValue(carMock),
    update: jest.fn().mockResolvedValue(updateCarMock),
    count: jest.fn().mockResolvedValue([carMock].length)
  },
  driver: {
    create: jest.fn().mockReturnValue(driver),
    findMany: jest.fn().mockResolvedValue([driver]),
    findFirst: jest.fn().mockResolvedValue(driver),
    delete: jest.fn().mockResolvedValue(driver),
    update: jest.fn().mockResolvedValue(updateDriver),
    count: jest.fn().mockResolvedValue([driver].length)
  },
  pickUpCar: {
    create: jest.fn().mockReturnValue(pickUpCarMock),
    findMany: jest.fn().mockResolvedValue([pickUpCarMock]),
    findFirst: jest.fn().mockResolvedValue(pickUpCarMock),
    delete: jest.fn().mockResolvedValue(pickUpCarMock),
    update: jest.fn().mockResolvedValue(updatePickUpCarMock),
    count: jest.fn().mockResolvedValue([pickUpCarMock].length)
  }
};