import { Category } from './category';

export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: TransactionType;
  date: string;
  category?: Category;
}

export interface Balance {
  income: number;
  expense: number;
  balance: number;
}
