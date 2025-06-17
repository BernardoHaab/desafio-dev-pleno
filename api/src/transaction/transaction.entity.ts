import { User } from 'src/user/user.entity';
import { Category } from '../category/category.entity';

export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export class Transaction {
  id: number;
  description: string;
  amount: number;
  type: TransactionType;
  date: Date;
  userId: number;
  categoryId?: number;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
  category?: Category;

  constructor(data: Partial<Transaction>) {
    Object.assign(this, data);
  }
}
