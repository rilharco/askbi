import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ExamsService {
  constructor(private readonly prisma: PrismaService) {}

  list() {
    return this.prisma.exam.findMany({
      include: { beltRank: true, participants: true },
      orderBy: { date: 'desc' }
    });
  }
}
