import { Category } from 'src/category/category.entity';
import { Transaction } from 'src/transaction/transaction.entity';

export class User {
  id: number;
  name: string;
  email: string;
  password: string; // Opcional para não expor em responses
  createdAt: Date;
  updatedAt: Date;
  categories: Category[] | null; // Pode ser null se o usuário não tiver categorias
  transactions: Transaction[] | null; // Pode ser null se o usuário não tiver transações

  constructor(data: Partial<User>) {
    Object.assign(this, data);
  }
}
