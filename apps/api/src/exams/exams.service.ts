import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ExamsService {
  constructor(private readonly prisma: PrismaService) {}

  list() {
    return this.prisma.exame.findMany({
      include: { graduacoes: true },
      orderBy: { data: 'desc' },
    });
  }
}
