import api from '@/lib/api';
import { Balance, Transaction } from '@/types/transaction';

export const dashboardService = {
  getTransactions: async (): Promise<Transaction[]> => {
    const response = await api.get('/transaction/list');
    return response.data;
  },

  getBalance: async (): Promise<Balance> => {
    const response = await api.get('/transaction/balance');
    return response.data;
  },
};
