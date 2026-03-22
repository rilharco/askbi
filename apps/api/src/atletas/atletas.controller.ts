import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AtletasService } from './atletas.service';
import { CreateAtletaDto } from './dto/create-atleta.dto';
import { QueryAtletaDto } from './dto/query-atleta.dto';

@ApiTags('atletas')
@Controller('atletas')
export class AtletasController {
  constructor(private readonly svc: AtletasService) {}

  @Get()
  @ApiOperation({ summary: 'Listar atletas (paginado)' })
  list(@Query() query: QueryAtletaDto) {
    return this.svc.list(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter atleta por ID' })
  findOne(@Param('id') id: string) {
    return this.svc.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Criar atleta' })
  create(@Body() body: CreateAtletaDto) {
    return this.svc.create(body);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar atleta' })
  update(@Param('id') id: string, @Body() body: Partial<CreateAtletaDto>) {
    return this.svc.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Desativar atleta (soft delete)' })
  remove(@Param('id') id: string) {
    return this.svc.remove(id);
  }
}
