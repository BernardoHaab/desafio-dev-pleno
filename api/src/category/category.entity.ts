import { Transaction } from '../transaction/transaction.entity';

export class Category {
  id: number;
  name: string;
  description: string | null;
  color: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  transactions?: Transaction[];

  constructor(data: Partial<Category>) {
    Object.assign(this, data);
  }
}
