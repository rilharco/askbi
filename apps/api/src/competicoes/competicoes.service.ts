import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CompeticoesService {
  constructor(private prisma: PrismaService) {}

  list() {
    return this.prisma.competicao.findMany({
      include: {
        _count: { select: { inscricoes: true, categorias: true } },
        escalas: { include: { arbitro: { select: { nome: true } } } },
      },
      orderBy: { data: 'desc' },
    });
  }

  async findOne(id: string) {
    const c = await this.prisma.competicao.findUnique({
      where: { id },
      include: {
        categorias: true,
        inscricoes: {
          include: {
            atleta: { select: { nome: true, clube: { select: { nome: true } } } },
            categoria: { select: { nome: true } },
          },
        },
        escalas: { include: { arbitro: { select: { nome: true, nivel: true } } } },
        diplomas: true,
      },
    });
    if (!c) throw new NotFoundException('Competição não encontrada');
    return c;
  }

  create(data: any) {
    return this.prisma.competicao.create({ data });
  }

  async update(id: string, data: any) {
    await this.findOne(id);
    return this.prisma.competicao.update({ where: { id }, data });
  }

  async addCategoria(competicaoId: string, data: any) {
    return this.prisma.categoriaComp.create({ data: { ...data, competicaoId } });
  }
}
