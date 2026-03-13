import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TemplatesService {
  constructor(private readonly prisma: PrismaService) {}

  list(ownerId: string) {
    return this.prisma.template.findMany({
      where: { ownerId },
      orderBy: { updatedAt: 'desc' }
    });
  }

  async create(ownerId: string, input: { name?: string; description?: string; content?: Prisma.InputJsonValue }) {
    const name = this.requireString(input.name, 'name');
    const content = input.content ?? this.defaultContent();
    return this.prisma.template.create({
      data: {
        ownerId,
        name,
        description: input.description?.trim() || null,
        content
      }
    });
  }

  async get(ownerId: string, id: string) {
    const template = await this.prisma.template.findFirst({ where: { id, ownerId } });
    if (!template) throw new NotFoundException('Template not found');
    return template;
  }

  async update(
    ownerId: string,
    id: string,
    input: { name?: string; description?: string; content?: Prisma.InputJsonValue; status?: string }
  ) {
    await this.get(ownerId, id);
    const data: { name?: string; description?: string | null; content?: Prisma.InputJsonValue; status?: string } = {};
    if (input.name !== undefined) data.name = this.requireString(input.name, 'name');
    if (input.description !== undefined) data.description = input.description?.trim() || null;
    if (input.content !== undefined) data.content = input.content;
    if (input.status !== undefined) data.status = this.requireString(input.status, 'status');
    if (Object.keys(data).length === 0) throw new BadRequestException('No fields to update');
    return this.prisma.template.update({ where: { id }, data });
  }

  async submit(ownerId: string, id: string) {
    await this.get(ownerId, id);
    return this.prisma.template.update({
      where: { id },
      data: { status: 'submitted', submittedAt: new Date() }
    });
  }

  async remove(ownerId: string, id: string) {
    await this.get(ownerId, id);
    return this.prisma.template.delete({ where: { id } });
  }

  private defaultContent() {
    return {
      title: 'Novo template',
      sections: [
        { type: 'header', text: 'Título principal' },
        { type: 'paragraph', text: 'Escreve aqui o conteúdo do template.' }
      ]
    };
  }

  private requireString(value: unknown, name: string) {
    if (typeof value !== 'string' || !value.trim()) {
      throw new BadRequestException(`Field "${name}" is required`);
    }
    return value.trim();
  }
}
