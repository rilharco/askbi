import { Module } from '@nestjs/common';
import { AtletasController } from './atletas.controller';
import { AtletasService } from './atletas.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AtletasController],
  providers: [AtletasService],
})
export class AtletasModule {}
