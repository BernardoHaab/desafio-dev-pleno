import { Injectable } from '@nestjs/common';
import {
  Category as CategoryPrisma,
  Transaction as TransactionPrisma,
} from 'generated/prisma';
import { PrismaService } from 'src/database/prisma.service';
import { Transaction } from '../transaction.entity';
import {
  BalanceSummary,
  CreateTransactionData,
  TransactionRepository,
} from './transaction.repository.interface';

interface TransactionPrismaFull extends TransactionPrisma {
  category: CategoryPrisma | null;
}

@Injectable()
export class PrismaCategoryRepository implements TransactionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    userId: number,
    data: CreateTransactionData,
  ): Promise<Transaction> {
    const { categoryId, ...transactionData } = data;
    const transaction = await this.prisma.transaction.create({
      data: {
        ...transactionData,
        user: {
          connect: { id: userId },
        },
        category: categoryId
          ? {
              connect: { id: categoryId },
            }
          : undefined,
      },
      include: {
        category: true,
      },
    });

    return this.transactionFromPrisma(transaction as TransactionPrismaFull);
  }

  findAll(userId: number): Promise<Transaction[]> {
    throw new Error('Method not implemented.');
  }

  getBalanceBy(userId: number): Promise<BalanceSummary> {
    throw new Error('Method not implemented.');
  }

  private transactionFromPrisma(
    transaction: TransactionPrismaFull,
  ): Transaction {
    return new Transaction({
      id: transaction.id,
      description: transaction.description,
      amount: transaction.amount.toNumber(),
      type: transaction.type as import('../transaction.entity').TransactionType,
      date: transaction.date,
      category: transaction.category
        ? {
            id: transaction.category.id,
            name: transaction.category.name,
            color: transaction.category.color,
            description: transaction.category.description,
            createdAt: transaction.category.createdAt,
            updatedAt: transaction.category.updatedAt,
            userId: transaction.category.userId,
          }
        : null,
    });
  }
}
