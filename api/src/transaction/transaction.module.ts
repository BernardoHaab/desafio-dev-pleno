import { Module } from '@nestjs/common';
import { categoryModule } from 'src/category/category.module';
import { CategoryService } from 'src/category/category.service';
import { PrismaService } from 'src/database/prisma.service';
import { PrismaTransactionRepository } from './repository/transaction-prisma.repository';
import { TransactionRepository } from './repository/transaction.repository.interface';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

@Module({
  imports: [categoryModule],
  controllers: [TransactionController],
  providers: [
    TransactionService,
    PrismaService,
    CategoryService,
    { provide: TransactionRepository, useClass: PrismaTransactionRepository },
  ],
})
export class TransactionModule {}
