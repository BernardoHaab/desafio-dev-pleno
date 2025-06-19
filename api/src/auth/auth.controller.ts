import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserDecorator } from 'src/user/user.decorator';
import { User } from 'src/user/user.entity';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/loginDTO';
import { RegisterDto } from './dto/registerDTO';
import { JwtAuthGuard } from './jwat-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerUserDto: RegisterDto): Promise<any> {
    return this.authService.register(registerUserDto);
  }

  // ToDo: send JWT in cookie
  @Post('login')
  async login(@Body() loginUserDto: LoginDto): Promise<any> {
    return await this.authService.login(loginUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('validate-token')
  validateToken(@UserDecorator() user: User): User {
    // Se passou pelo guard, o usuário já está validado
    return user;
  }
}
