import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BeltsService {
  constructor(private readonly prisma: PrismaService) {}

  list() {
    return this.prisma.beltRank.findMany({ orderBy: { order: 'asc' } });
  }
}
