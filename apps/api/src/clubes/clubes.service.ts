import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClubesService {
  constructor(private prisma: PrismaService) {}

  list() {
    return this.prisma.clube.findMany({
      include: {
        _count: { select: { atletas: true, treinadores: true } },
      },
      orderBy: { nome: 'asc' },
    });
  }

  async findOne(id: string) {
    const clube = await this.prisma.clube.findUnique({
      where: { id },
      include: {
        atletas: { where: { ativo: true }, select: { id: true, nome: true, escalao: true, kyuAtual: true } },
        treinadores: {
          include: { treinador: { select: { id: true, nome: true, grau: true, numCedula: true } } },
        },
        pagamentos: { orderBy: { createdAt: 'desc' }, take: 5 },
        documentos: true,
      },
    });
    if (!clube) throw new NotFoundException('Clube não encontrado');
    return clube;
  }

  create(data: any) {
    return this.prisma.clube.create({ data });
  }

  async update(id: string, data: any) {
    await this.findOne(id);
    return this.prisma.clube.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.clube.update({ where: { id }, data: { estado: 'Extinto' } });
  }
}
