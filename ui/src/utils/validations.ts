import { transactionTypes } from '@/types/transaction';
import { z } from 'zod';

export const transactionSchema = z.object({
  description: z.string().min(1, 'Descrição é obrigatória'),
  amount: z.number().min(0.01, 'Valor deve ser maior que zero'),
  type: z.enum(transactionTypes, {
    required_error: 'Tipo é obrigatório',
  }),
  date: z.string().min(1, 'Data é obrigatória'),
  categoryId: z.number().optional(),
});

export const categorySchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').max(50, 'Nome muito longo'),
  description: z.string().max(200, 'Descrição muito longa').optional(),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Cor inválida'),
});

export type TransactionForm = z.infer<typeof transactionSchema>;
export type CategoryForm = z.infer<typeof categorySchema>;
