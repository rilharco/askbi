import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

type CreateUserInput = {
  email: string;
  name: string | null;
  passwordHash: string;
};

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  create(input: CreateUserInput) {
    return this.prisma.user.create({
      data: {
        email: input.email,
        name: input.name,
        passwordHash: input.passwordHash
      }
    });
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async update(id: string, input: { name?: string; onboardingComplete?: boolean }) {
    const data: { name?: string; onboardingComplete?: boolean } = {};
    if (input.name !== undefined) {
      if (!input.name.trim()) throw new BadRequestException('Name required');
      data.name = input.name.trim();
    }
    if (input.onboardingComplete !== undefined) {
      data.onboardingComplete = Boolean(input.onboardingComplete);
    }
    if (Object.keys(data).length === 0) throw new BadRequestException('No fields to update');
    return this.prisma.user.update({ where: { id }, data });
  }

  updatePassword(id: string, passwordHash: string) {
    return this.prisma.user.update({
      where: { id },
      data: { passwordHash }
    });
  }

  async getSafe(id: string) {
    const user = await this.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return this.toSafeUser(user);
  }

  toSafeUser(user: { id: string; email: string; name: string | null; role: string; onboardingComplete: boolean }) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      onboardingComplete: user.onboardingComplete
    };
  }
}
