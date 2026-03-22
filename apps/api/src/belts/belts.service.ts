import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BeltsService {
  constructor(private readonly prisma: PrismaService) {}

  list() {
    // Legacy: BeltRank was replaced by Graduacao in the new schema
    return this.prisma.graduacao.findMany({ orderBy: { data: 'desc' }, take: 50 });
  }
}
