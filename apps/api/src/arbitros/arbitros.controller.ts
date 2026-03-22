import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ArbitrosService } from './arbitros.service';

@Controller('arbitros')
export class ArbitrosController {
  constructor(private readonly svc: ArbitrosService) {}

  @Get()
  list() { return this.svc.list(); }

  @Get(':id')
  findOne(@Param('id') id: string) { return this.svc.findOne(id); }

  @Post()
  create(@Body() body: any) { return this.svc.create(body); }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) { return this.svc.update(id, body); }

  @Delete(':id')
  remove(@Param('id') id: string) { return this.svc.remove(id); }
}
