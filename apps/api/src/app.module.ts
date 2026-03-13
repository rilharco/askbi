import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { BeltsModule } from './belts/belts.module';
import { ExamsModule } from './exams/exams.module';
import { MembersModule } from './members/members.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { FlowsModule } from './flows/flows.module';
import { TemplatesModule } from './templates/templates.module';

@Module({
  imports: [PrismaModule, BeltsModule, ExamsModule, MembersModule, UsersModule, AuthModule, FlowsModule, TemplatesModule]
})
export class AppModule {}
