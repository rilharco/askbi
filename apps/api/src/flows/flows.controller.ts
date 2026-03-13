import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { FlowsService } from './flows.service';

@Controller('flows')
@UseGuards(JwtAuthGuard)
export class FlowsController {
  constructor(private readonly flows: FlowsService) {}

  @Get()
  list(@Req() req: { user: { id: string } }) {
    return this.flows.list(req.user.id);
  }

  @Post()
  create(
    @Req() req: { user: { id: string } },
    @Body() body: { name?: string; description?: string; steps?: Prisma.InputJsonValue }
  ) {
    return this.flows.create(req.user.id, body);
  }

  @Get(':id')
  get(@Req() req: { user: { id: string } }, @Param('id') id: string) {
    return this.flows.get(req.user.id, id);
  }

  @Patch(':id')
  update(
    @Req() req: { user: { id: string } },
    @Param('id') id: string,
    @Body() body: { name?: string; description?: string; steps?: Prisma.InputJsonValue; status?: string }
  ) {
    return this.flows.update(req.user.id, id, body);
  }

  @Delete(':id')
  remove(@Req() req: { user: { id: string } }, @Param('id') id: string) {
    return this.flows.remove(req.user.id, id);
  }

  @Post(':id/run')
  run(
    @Req() req: { user: { id: string } },
    @Param('id') id: string,
    @Body() body: { input?: Prisma.InputJsonValue }
  ) {
    return this.flows.run(req.user.id, id, body.input ?? {});
  }

  @Get(':id/runs')
  runs(@Req() req: { user: { id: string } }, @Param('id') id: string) {
    return this.flows.runs(req.user.id, id);
  }
}
