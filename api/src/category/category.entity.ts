import { User } from 'src/user/user.entity';
import { Transaction } from '../transaction/transaction.entity';

export class Category {
  id: number;
  name: string;
  description: string | null;
  color: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
  transactions?: Transaction[];
}
