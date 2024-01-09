import { Test, TestingModule } from '@nestjs/testing';
import { PickUpCarService } from './pick-up-car.service';

describe('PickUpCarService', () => {
  let service: PickUpCarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PickUpCarService],
    }).compile();

    service = module.get<PickUpCarService>(PickUpCarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
