import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { swagger } from 'src/swagger';
import { UserDecorator } from 'src/user/user.decorator';
import { User } from 'src/user/user.entity';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/loginDTO';
import { RegisterDto } from './dto/registerDTO';
import { JwtAuthGuard } from './jwat-auth.guard';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation(swagger.auth.register.operation)
  @ApiBody({ type: RegisterDto })
  @ApiResponse(swagger.auth.register.response.success)
  @ApiResponse(swagger.auth.register.response.conflict)
  async register(@Body() registerUserDto: RegisterDto): Promise<any> {
    await this.authService.register(registerUserDto);
    return {
      message: 'Usuário registrado com sucesso',
    };
  }

  @Post('login')
  @ApiOperation(swagger.auth.login.operation)
  @ApiBody({ type: LoginDto })
  @ApiResponse(swagger.auth.login.response.success)
  @ApiResponse(swagger.auth.login.response.unauthorized)
  async login(@Body() loginUserDto: LoginDto): Promise<any> {
    return await this.authService.login(loginUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('validate-token')
  @ApiBearerAuth()
  @ApiOperation(swagger.auth.validateToken.operation)
  @ApiResponse(swagger.auth.validateToken.response.success)
  @ApiResponse(swagger.auth.validateToken.response.unauthorized)
  validateToken(@UserDecorator() user: User): User {
    // Se passou pelo guard, o usuário já está validado
    return user;
  }
}
