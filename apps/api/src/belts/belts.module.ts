import { Module } from '@nestjs/common';
import { BeltsService } from './belts.service';
import { BeltsController } from './belts.controller';

@Module({
  controllers: [BeltsController],
  providers: [BeltsService]
})
export class BeltsModule {}
