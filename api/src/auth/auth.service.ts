import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRepository } from 'src/user/repository/user.interface.repository';
import { User } from 'src/user/user.entity';
import { LoginDto } from './dto/loginDTO';
import { RegisterDto } from './dto/registerDTO';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async register(newUser: RegisterDto) {
    const { name, email, password } = newUser;

    // Verificar se usuário já existe
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email já está em uso');
    }

    // Hash da senha
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Criar usuário
    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  async login(loginUserDto: LoginDto) {
    const { email, password } = loginUserDto;

    // Buscar usuário
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Gerar token
    const payload = { sub: user.id, email: user.email };
    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  createToken(user: User) {
    const payload = { sub: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }
}
