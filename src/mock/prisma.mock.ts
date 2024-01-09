import { Car } from '@prisma/client';

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

export const prismaMock = {
  car: {
    create: jest.fn().mockReturnValue(car),
    findMany: jest.fn().mockResolvedValue([car]),
    findFirst: jest.fn().mockResolvedValue(car),
    delete: jest.fn().mockResolvedValue(car),
    update: jest.fn().mockResolvedValue(updateCar),
  },
};