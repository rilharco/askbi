import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@Req() req: { user: { id: string } }) {
    return this.users.getSafe(req.user.id);
  }

  @Patch('me')
  @UseGuards(JwtAuthGuard)
  updateMe(
    @Req() req: { user: { id: string } },
    @Body() body: { name?: string; onboardingComplete?: boolean }
  ) {
    return this.users.update(req.user.id, body);
  }
}
