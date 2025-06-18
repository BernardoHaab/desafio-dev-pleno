import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwat-auth.guard';
import { UserDecorator } from './user.decorator';
import { User } from './user.entity';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly authService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@UserDecorator() user: User): User {
    console.log('User request:', user);
    return user;
  }
}
