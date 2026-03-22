import { Controller, Get, Post, Patch, Param, Body, Query } from '@nestjs/common';
import { FinanceiroService } from './financeiro.service';

@Controller('financeiro')
export class FinanceiroController {
  constructor(private readonly svc: FinanceiroService) {}

  @Get('pagamentos')
  list(@Query('clubeId') clubeId?: string, @Query('tipo') tipo?: string, @Query('estado') estado?: string) {
    return this.svc.listPagamentos({ clubeId, tipo, estado });
  }

  @Get('pagamentos/:id')
  findOne(@Param('id') id: string) { return this.svc.findPagamento(id); }

  @Post('pagamentos')
  create(@Body() body: any) { return this.svc.createPagamento(body); }

  @Patch('pagamentos/:id')
  update(@Param('id') id: string, @Body() body: any) { return this.svc.updatePagamento(id, body); }

  @Get('resumo')
  resumo(@Query('ano') ano?: string) {
    return this.svc.resumo(ano ? parseInt(ano) : undefined);
  }
}
