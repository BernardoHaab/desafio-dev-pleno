import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { categoryModule } from './category/category.module';
import { TransactionModule } from './transaction/transaction.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, AuthModule, categoryModule, TransactionModule],
})
export class AppModule {}
