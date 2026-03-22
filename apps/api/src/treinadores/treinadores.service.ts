import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TreinadoresService {
  constructor(private prisma: PrismaService) {}

  list() {
    return this.prisma.treinador.findMany({
      where: { ativo: true },
      include: {
        clubes: { include: { clube: { select: { nome: true } } } },
        formacoes: true,
      },
      orderBy: { nome: 'asc' },
    });
  }

  async findOne(id: string) {
    const t = await this.prisma.treinador.findUnique({
      where: { id },
      include: {
        clubes: { include: { clube: { select: { nome: true, localidade: true } } } },
        formacoes: true,
        licencas: { orderBy: { validade: 'desc' }, take: 5 },
      },
    });
    if (!t) throw new NotFoundException('Treinador não encontrado');
    return t;
  }

  create(data: any) {
    return this.prisma.treinador.create({ data });
  }

  async update(id: string, data: any) {
    await this.findOne(id);
    return this.prisma.treinador.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.treinador.update({ where: { id }, data: { ativo: false } });
  }
}
