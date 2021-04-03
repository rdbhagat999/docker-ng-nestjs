import { Test, TestingModule } from '@nestjs/testing';
import { ResetController } from './reset.controller';

describe('ResetController', () => {
  let controller: ResetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResetController],
    }).compile();

    controller = module.get<ResetController>(ResetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
