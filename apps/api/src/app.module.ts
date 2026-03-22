import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from './prisma/prisma.module';
import { BeltsModule } from './belts/belts.module';
import { ExamsModule } from './exams/exams.module';
import { MembersModule } from './members/members.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { FlowsModule } from './flows/flows.module';
import { TemplatesModule } from './templates/templates.module';
import { AtletasModule } from './atletas/atletas.module';
import { ClubesModule } from './clubes/clubes.module';
import { TreinadoresModule } from './treinadores/treinadores.module';
import { CompeticoesModule } from './competicoes/competicoes.module';
import { ArbitrosModule } from './arbitros/arbitros.module';
import { FinanceiroModule } from './financeiro/financeiro.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 60 }]),
    PrismaModule,
    BeltsModule,
    ExamsModule,
    MembersModule,
    UsersModule,
    AuthModule,
    FlowsModule,
    TemplatesModule,
    AtletasModule,
    ClubesModule,
    TreinadoresModule,
    CompeticoesModule,
    ArbitrosModule,
    FinanceiroModule,
  ],
})
export class AppModule {}
