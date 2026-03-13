import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly users: UsersService, private readonly jwt: JwtService) {}

  async register(input: { email?: string; password?: string; name?: string }) {
    const email = this.requireString(input.email, 'email').toLowerCase();
    const password = this.requireString(input.password, 'password');
    const name = input.name?.trim() || null;

    const existing = await this.users.findByEmail(email);
    if (existing) throw new BadRequestException('Email already in use');

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await this.users.create({ email, name, passwordHash });
    const token = await this.sign(user.id, user.email);
    return { user: this.users.toSafeUser(user), accessToken: token };
  }

  async login(input: { email?: string; password?: string }) {
    const email = this.requireString(input.email, 'email').toLowerCase();
    const password = this.requireString(input.password, 'password');
    const user = await this.users.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Invalid credentials');
    const token = await this.sign(user.id, user.email);
    return { user: this.users.toSafeUser(user), accessToken: token };
  }

  async resetPassword(input: { email?: string; newPassword?: string }) {
    const email = this.requireString(input.email, 'email').toLowerCase();
    const newPassword = this.requireString(input.newPassword, 'newPassword');
    const user = await this.users.findByEmail(email);
    if (!user) throw new NotFoundException('User not found');
    const passwordHash = await bcrypt.hash(newPassword, 10);
    await this.users.updatePassword(user.id, passwordHash);
    return { ok: true };
  }

  async sign(userId: string, email: string) {
    return this.jwt.signAsync({ sub: userId, email });
  }

  private requireString(value: unknown, name: string) {
    if (typeof value !== 'string' || !value.trim()) {
      throw new BadRequestException(`Field "${name}" is required`);
    }
    return value.trim();
  }
}
