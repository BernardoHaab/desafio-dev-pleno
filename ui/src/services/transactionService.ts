import api from '@/lib/api';
import { Balance, NewTransactionDto, Transaction } from '@/types/transaction';

export const transactionService = {
  getTransactions: async (): Promise<Transaction[]> => {
    const response = await api.get('/transaction/list');
    return response.data;
  },

  getBalance: async (): Promise<Balance> => {
    const response = await api.get('/transaction/balance');
    return response.data;
  },

  createTransaction: async (
    transaction: NewTransactionDto,
  ): Promise<Transaction> => {
    const response = await api.post('/transaction/create', transaction);
    return response.data;
  },
};
