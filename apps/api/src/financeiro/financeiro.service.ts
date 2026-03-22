import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FinanceiroService {
  constructor(private prisma: PrismaService) {}

  listPagamentos(query?: { clubeId?: string; tipo?: string; estado?: string }) {
    return this.prisma.pagamento.findMany({
      where: {
        ...(query?.clubeId ? { clubeId: query.clubeId } : {}),
        ...(query?.tipo ? { tipo: query.tipo } : {}),
        ...(query?.estado ? { estado: query.estado } : {}),
      },
      include: { clube: { select: { nome: true, filiacaoNum: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findPagamento(id: string) {
    const p = await this.prisma.pagamento.findUnique({
      where: { id },
      include: { clube: true },
    });
    if (!p) throw new NotFoundException('Pagamento não encontrado');
    return p;
  }

  createPagamento(data: any) {
    return this.prisma.pagamento.create({ data });
  }

  async updatePagamento(id: string, data: any) {
    await this.findPagamento(id);
    return this.prisma.pagamento.update({ where: { id }, data });
  }

  async resumo(anoRef?: number) {
    const ano = anoRef || new Date().getFullYear();
    const pagamentos = await this.prisma.pagamento.findMany({ where: { anoRef: ano } });
    const total = pagamentos.reduce((s, p) => s + p.valor, 0);
    const pago = pagamentos.filter(p => p.estado === 'Pago').reduce((s, p) => s + p.valor, 0);
    const pendente = pagamentos.filter(p => p.estado === 'Pendente' || p.estado === 'EmAtraso').reduce((s, p) => s + p.valor, 0);
    return { ano, total, pago, pendente, count: pagamentos.length };
  }
}
