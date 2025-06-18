import {
  BalanceSummary,
  Transaction,
  TransactionType,
} from '../transaction.entity';

export interface CreateTransactionData {
  description: string;
  amount: number;
  type: TransactionType;
  date: Date;
  categoryId?: number;
}

export interface UpdateTransactionData {
  description?: string;
  amount?: number;
  type?: TransactionType;
  date?: Date;
  categoryId?: number;
}

export abstract class TransactionRepository {
  abstract create(
    userId: number,
    data: CreateTransactionData,
  ): Promise<Transaction>;
  abstract findAll(userId: number): Promise<Transaction[]>;
  abstract getBalanceBy(userId: number): Promise<BalanceSummary>;
}
