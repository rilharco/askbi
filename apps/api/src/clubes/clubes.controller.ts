import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ClubesService } from './clubes.service';
import { CreateClubeDto } from './dto/create-clube.dto';

@ApiTags('clubes')
@Controller('clubes')
export class ClubesController {
  constructor(private readonly svc: ClubesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar clubes' })
  list() {
    return this.svc.list();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter clube por ID' })
  findOne(@Param('id') id: string) {
    return this.svc.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Criar clube' })
  create(@Body() body: CreateClubeDto) {
    return this.svc.create(body);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar clube' })
  update(@Param('id') id: string, @Body() body: Partial<CreateClubeDto>) {
    return this.svc.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover clube' })
  remove(@Param('id') id: string) {
    return this.svc.remove(id);
  }
}
