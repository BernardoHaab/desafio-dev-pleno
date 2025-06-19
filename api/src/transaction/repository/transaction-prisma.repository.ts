import { Injectable } from '@nestjs/common';
import {
  Category as CategoryPrisma,
  Transaction as TransactionPrisma,
} from 'generated/prisma';
import { PrismaService } from 'src/database/prisma.service';
import { BalanceSummary, Transaction } from '../transaction.entity';
import {
  CreateTransactionData,
  TransactionRepository,
} from './transaction.repository.interface';

interface TransactionPrismaFull extends TransactionPrisma {
  category: CategoryPrisma | null;
}

@Injectable()
export class PrismaTransactionRepository implements TransactionRepository {
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

  async findAll(userId: number): Promise<Transaction[]> {
    const transactions = await this.prisma.transaction.findMany({
      where: { userId },
      include: { category: true },
      orderBy: { date: 'desc' },
    });

    return transactions.map((transaction) =>
      this.transactionFromPrisma(transaction as TransactionPrismaFull),
    );
  }

  async getBalanceBy(userId: number): Promise<BalanceSummary> {
    const balance = await this.prisma.$queryRaw<BalanceSummary[]>`
      SELECT
        SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS income,
        SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS expense,
        SUM(CASE WHEN type = 'income' THEN amount ELSE amount*-1 END) AS balance
      FROM transactions
      WHERE user_id = ${userId}
    `;

    return balance[0] || { income: 0, expense: 0, balance: 0 };
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
