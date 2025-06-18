import { Transaction, TransactionType } from '../transaction.entity';

export interface CreateTransactionData {
  description: string;
  amount: number;
  type: TransactionType;
  date: Date;
  userId: number;
  categoryId?: number;
}

export interface UpdateTransactionData {
  description?: string;
  amount?: number;
  type?: TransactionType;
  date?: Date;
  categoryId?: number;
}

export interface TransactionFilters {
  userId: number;
  type?: TransactionType;
  categoryId?: number;
  startDate?: Date;
  endDate?: Date;
}

export interface BalanceSummary {
  income: number;
  expense: number;
  balance: number;
}

export interface ITransactionRepository {
  create(data: CreateTransactionData): Promise<Transaction>;
  findById(id: number): Promise<Transaction | null>;
  findByUserIdAndId(userId: number, id: number): Promise<Transaction | null>;
  findByFilters(filters: TransactionFilters): Promise<Transaction[]>;
  update(id: number, data: UpdateTransactionData): Promise<Transaction>;
  delete(id: number): Promise<void>;
  getBalanceByUserId(userId: number): Promise<BalanceSummary>;
  countByUserId(userId: number): Promise<number>;
}
