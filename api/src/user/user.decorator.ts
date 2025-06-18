import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity';

export const UserDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    ctx.switchToHttp().getRequest();
    const request = ctx.switchToHttp().getRequest<{ user?: User }>();
    if (!request || !request.user) {
      throw new Error('User not found in request');
    }
    return request.user;
  },
);
