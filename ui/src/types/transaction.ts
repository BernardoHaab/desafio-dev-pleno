import { Category } from './category';

export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export const transactionTypes: [string, string] = ['INCOME', 'EXPENSE'];

export interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: TransactionType;
  date: string;
  category?: Category;
}

export interface NewTransactionDto {
  description: string;
  amount: number;
  type: (typeof transactionTypes)[number];
  date: string;
  categoryId?: number;
}

export interface Balance {
  income: number;
  expense: number;
  balance: number;
}
