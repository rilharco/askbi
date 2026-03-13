import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { TemplatesService } from './templates.service';

@Controller('templates')
@UseGuards(JwtAuthGuard)
export class TemplatesController {
  constructor(private readonly templates: TemplatesService) {}

  @Get()
  list(@Req() req: { user: { id: string } }) {
    return this.templates.list(req.user.id);
  }

  @Post()
  create(
    @Req() req: { user: { id: string } },
    @Body() body: { name?: string; description?: string; content?: Prisma.InputJsonValue }
  ) {
    return this.templates.create(req.user.id, body);
  }

  @Get(':id')
  get(@Req() req: { user: { id: string } }, @Param('id') id: string) {
    return this.templates.get(req.user.id, id);
  }

  @Patch(':id')
  update(
    @Req() req: { user: { id: string } },
    @Param('id') id: string,
    @Body() body: { name?: string; description?: string; content?: Prisma.InputJsonValue; status?: string }
  ) {
    return this.templates.update(req.user.id, id, body);
  }

  @Post(':id/submit')
  submit(@Req() req: { user: { id: string } }, @Param('id') id: string) {
    return this.templates.submit(req.user.id, id);
  }

  @Delete(':id')
  remove(@Req() req: { user: { id: string } }, @Param('id') id: string) {
    return this.templates.remove(req.user.id, id);
  }
}
