import { Controller, Get } from '@nestjs/common';
import { BeltsService } from './belts.service';

@Controller('belts')
export class BeltsController {
  constructor(private readonly belts: BeltsService) {}

  @Get()
  list() {
    return this.belts.list();
  }
}
