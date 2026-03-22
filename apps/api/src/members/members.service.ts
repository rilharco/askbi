import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MembersService {
  constructor(private readonly prisma: PrismaService) {}

  list() {
    // Legacy: Member was replaced by Atleta in the new schema
    return this.prisma.atleta.findMany({
      where: { ativo: true },
      include: { graduacoes: { orderBy: { data: 'desc' }, take: 1 } },
      orderBy: { nome: 'asc' },
    });
  }
}
