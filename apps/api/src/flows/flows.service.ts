import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

type FlowStep =
  | { type: 'VALIDATE'; config: { requiredFields?: string[] } }
  | { type: 'ROUTE'; config: { field?: string; cases?: { equals: string; route: string }[]; defaultRoute?: string } }
  | { type: 'NOTIFY'; config: { channel?: string; message?: string } };

@Injectable()
export class FlowsService {
  constructor(private readonly prisma: PrismaService) {}

  list(ownerId: string) {
    return this.prisma.flow.findMany({
      where: { ownerId },
      orderBy: { updatedAt: 'desc' }
    });
  }

  async create(ownerId: string, input: { name?: string; description?: string; steps?: Prisma.InputJsonValue }) {
    const name = this.requireString(input.name, 'name');
    const steps = this.normalizeSteps(input.steps);
    return this.prisma.flow.create({
      data: {
        ownerId,
        name,
        description: input.description?.trim() || null,
        steps
      }
    });
  }

  async get(ownerId: string, id: string) {
    const flow = await this.prisma.flow.findFirst({ where: { id, ownerId } });
    if (!flow) throw new NotFoundException('Flow not found');
    return flow;
  }

  async update(
    ownerId: string,
    id: string,
    input: { name?: string; description?: string; steps?: Prisma.InputJsonValue; status?: string }
  ) {
    await this.get(ownerId, id);
    const data: { name?: string; description?: string | null; steps?: Prisma.InputJsonValue; status?: string } = {};
    if (input.name !== undefined) data.name = this.requireString(input.name, 'name');
    if (input.description !== undefined) data.description = input.description?.trim() || null;
    if (input.status !== undefined) data.status = this.requireString(input.status, 'status');
    if (input.steps !== undefined) data.steps = this.normalizeSteps(input.steps);
    if (Object.keys(data).length === 0) throw new BadRequestException('No fields to update');
    return this.prisma.flow.update({ where: { id }, data });
  }

  async remove(ownerId: string, id: string) {
    await this.get(ownerId, id);
    return this.prisma.flow.delete({ where: { id } });
  }

  async run(ownerId: string, id: string, input: Prisma.InputJsonValue) {
    const flow = await this.get(ownerId, id);
    const steps = this.normalizeSteps(flow.steps);
    const context: Prisma.InputJsonObject = { input };
    const logs: Prisma.InputJsonValue[] = [];
    let status = 'success';

    for (const [index, step] of steps.entries()) {
      const baseLog: Record<string, unknown> = { step: index + 1, type: step.type };
      try {
        if (step.type === 'VALIDATE') {
          const required = step.config.requiredFields || [];
          const missing = required.filter((field) => !this.hasField(input, field));
          if (missing.length) throw new Error(`Missing fields: ${missing.join(', ')}`);
          logs.push({ ...baseLog, status: 'ok' } as Prisma.InputJsonValue);
        }
        if (step.type === 'ROUTE') {
          const field = step.config.field || '';
          const value = this.getField(input, field);
          const match = step.config.cases?.find((c) => c.equals === String(value));
          const route = match?.route || step.config.defaultRoute || 'default';
          (context as Record<string, Prisma.InputJsonValue>).route = route;
          logs.push({ ...baseLog, status: 'ok', route } as Prisma.InputJsonValue);
        }
        if (step.type === 'NOTIFY') {
          const channel = step.config.channel || 'log';
          const message = step.config.message || 'Notification sent';
          logs.push({ ...baseLog, status: 'ok', channel, message } as Prisma.InputJsonValue);
        }
      } catch (err) {
        status = 'failed';
        logs.push({ ...baseLog, status: 'error', error: (err as Error).message } as Prisma.InputJsonValue);
        break;
      }
    }

    const run = await this.prisma.flowRun.create({
      data: {
        flowId: flow.id,
        status,
        input,
        output: context,
        logs,
        finishedAt: new Date()
      }
    });
    return run;
  }

  async runs(ownerId: string, id: string) {
    await this.get(ownerId, id);
    return this.prisma.flowRun.findMany({
      where: { flowId: id },
      orderBy: { startedAt: 'desc' }
    });
  }

  private normalizeSteps(steps: unknown): FlowStep[] {
    if (!steps || !Array.isArray(steps)) {
      return [
        { type: 'VALIDATE', config: { requiredFields: [] } },
        { type: 'ROUTE', config: { field: 'type', cases: [], defaultRoute: 'default' } },
        { type: 'NOTIFY', config: { channel: 'log', message: 'Flow executed' } }
      ];
    }
    return steps as FlowStep[];
  }

  private requireString(value: unknown, name: string) {
    if (typeof value !== 'string' || !value.trim()) {
      throw new BadRequestException(`Field "${name}" is required`);
    }
    return value.trim();
  }

  private hasField(input: unknown, field: string) {
    if (!field) return false;
    const value = this.getField(input, field);
    return value !== undefined && value !== null && value !== '';
  }

  private getField(input: unknown, field: string) {
    if (!field) return undefined;
    const obj = input as Record<string, unknown>;
    return field.split('.').reduce<unknown>((acc, key) => {
      if (acc && typeof acc === 'object' && key in (acc as Record<string, unknown>)) {
        return (acc as Record<string, unknown>)[key];
      }
      return undefined;
    }, obj);
  }
}
