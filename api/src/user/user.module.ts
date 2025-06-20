import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { PrismaUserRepository } from './repository/user-prisma.repository';
import { UserRepository } from './repository/user.interface.repository';

@Module({
  imports: [],
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
})
export class UserModule {}
