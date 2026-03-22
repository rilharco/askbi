import { Module } from '@nestjs/common';
import { CompeticoesController } from './competicoes.controller';
import { CompeticoesService } from './competicoes.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CompeticoesController],
  providers: [CompeticoesService],
})
export class CompeticoesModule {}
