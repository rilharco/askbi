import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { TreinadoresService } from './treinadores.service';

@Controller('treinadores')
export class TreinadoresController {
  constructor(private readonly svc: TreinadoresService) {}

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
