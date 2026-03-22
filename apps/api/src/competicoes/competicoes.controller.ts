import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { CompeticoesService } from './competicoes.service';

@Controller('competicoes')
export class CompeticoesController {
  constructor(private readonly svc: CompeticoesService) {}

  @Get()
  list() { return this.svc.list(); }

  @Get(':id')
  findOne(@Param('id') id: string) { return this.svc.findOne(id); }

  @Post()
  create(@Body() body: any) { return this.svc.create(body); }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) { return this.svc.update(id, body); }

  @Post(':id/categorias')
  addCategoria(@Param('id') id: string, @Body() body: any) {
    return this.svc.addCategoria(id, body);
  }
}
