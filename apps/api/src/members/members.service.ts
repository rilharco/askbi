import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MembersService {
  constructor(private readonly prisma: PrismaService) {}

  list() {
    return this.prisma.member.findMany({
      include: { rankHistory: { include: { beltRank: true } } }
    });
  }
}
