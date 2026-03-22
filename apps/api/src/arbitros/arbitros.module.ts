import { Module } from '@nestjs/common';
import { ArbitrosController } from './arbitros.controller';
import { ArbitrosService } from './arbitros.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ArbitrosController],
  providers: [ArbitrosService],
})
export class ArbitrosModule {}
