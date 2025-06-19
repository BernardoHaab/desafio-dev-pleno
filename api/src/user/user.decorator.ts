import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './user.entity';

export const UserDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    ctx.switchToHttp().getRequest();
    const request = ctx.switchToHttp().getRequest<{ user?: User }>();
    if (!request || !request.user) {
      throw new UnauthorizedException('Usuário não encontrado na requisição');
    }
    return request.user;
  },
);
