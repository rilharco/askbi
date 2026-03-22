import { Module } from '@nestjs/common';
import { ClubesController } from './clubes.controller';
import { ClubesService } from './clubes.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ClubesController],
  providers: [ClubesService],
})
export class ClubesModule {}
