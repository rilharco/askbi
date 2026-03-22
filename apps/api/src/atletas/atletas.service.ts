import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAtletaDto } from './dto/create-atleta.dto';
import { QueryAtletaDto } from './dto/query-atleta.dto';

@Injectable()
export class AtletasService {
  constructor(private prisma: PrismaService) {}

  async list(query: QueryAtletaDto = {}) {
    const { clubeId, escalao, page = 1, limit = 20 } = query;
    const skip = (page - 1) * limit;
    const where = {
      ...(clubeId ? { clubeId } : {}),
      ...(escalao ? { escalao } : {}),
      ativo: true,
    };

    const [data, total] = await Promise.all([
      this.prisma.atleta.findMany({
        where,
        include: {
          clube: { select: { nome: true } },
          graduacoes: { orderBy: { data: 'desc' }, take: 1 },
        },
        orderBy: { nome: 'asc' },
        skip,
        take: limit,
      }),
      this.prisma.atleta.count({ where }),
    ]);

    return { data, total, page, limit, pages: Math.ceil(total / limit) };
  }

  async findOne(id: string) {
    const atleta = await this.prisma.atleta.findUnique({
      where: { id },
      include: {
        clube: { select: { nome: true, filiacaoNum: true } },
        graduacoes: { orderBy: { data: 'asc' } },
        documentos: true,
        inscricoes: {
          include: {
            competicao: { select: { nome: true, data: true } },
            categoria: { select: { nome: true } },
          },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });
    if (!atleta) throw new NotFoundException('Atleta não encontrado');
    return atleta;
  }

  create(data: CreateAtletaDto) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.prisma.atleta.create({ data: data as any });
  }

  async update(id: string, data: Partial<CreateAtletaDto>) {
    await this.findOne(id);
    return this.prisma.atleta.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.atleta.update({ where: { id }, data: { ativo: false } });
  }
}
