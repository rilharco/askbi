import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ArbitrosService {
  constructor(private prisma: PrismaService) {}

  list() {
    return this.prisma.arbitro.findMany({
      where: { ativo: true },
      include: {
        licencas: { orderBy: { validade: 'desc' }, take: 1 },
        escalas: {
          include: { competicao: { select: { nome: true, data: true } } },
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
      },
      orderBy: { nome: 'asc' },
    });
  }

  async findOne(id: string) {
    const a = await this.prisma.arbitro.findUnique({
      where: { id },
      include: {
        licencas: { orderBy: { validade: 'desc' } },
        formacoes: true,
        escalas: {
          include: { competicao: { select: { nome: true, data: true } } },
          orderBy: { createdAt: 'desc' },
        },
      },
    });
    if (!a) throw new NotFoundException('Árbitro não encontrado');
    return a;
  }

  create(data: any) {
    return this.prisma.arbitro.create({ data });
  }

  async update(id: string, data: any) {
    await this.findOne(id);
    return this.prisma.arbitro.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.arbitro.update({ where: { id }, data: { ativo: false } });
  }
}
