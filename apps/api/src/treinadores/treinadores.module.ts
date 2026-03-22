import { Module } from '@nestjs/common';
import { TreinadoresController } from './treinadores.controller';
import { TreinadoresService } from './treinadores.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TreinadoresController],
  providers: [TreinadoresService],
})
export class TreinadoresModule {}
