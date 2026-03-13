import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.guard';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService, private readonly users: UsersService) {}

  @Post('register')
  register(@Body() body: { email?: string; password?: string; name?: string }) {
    return this.auth.register(body);
  }

  @Post('login')
  login(@Body() body: { email?: string; password?: string }) {
    return this.auth.login(body);
  }

  @Post('reset')
  reset(@Body() body: { email?: string; newPassword?: string }) {
    return this.auth.resetPassword(body);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@Req() req: { user: { id: string } }) {
    return this.users.getSafe(req.user.id);
  }
}
