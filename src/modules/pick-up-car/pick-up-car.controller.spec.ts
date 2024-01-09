import { Test, TestingModule } from '@nestjs/testing';
import { PickUpCarController } from './pick-up-car.controller';
import { PickUpCarService } from './pick-up-car.service';

describe('PickUpCarController', () => {
  let controller: PickUpCarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PickUpCarController],
      providers: [PickUpCarService],
    }).compile();

    controller = module.get<PickUpCarController>(PickUpCarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
