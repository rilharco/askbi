import { Controller, Get } from '@nestjs/common';
import { ExamsService } from './exams.service';

@Controller('exams')
export class ExamsController {
  constructor(private readonly exams: ExamsService) {}

  @Get()
  list() {
    return this.exams.list();
  }
}
