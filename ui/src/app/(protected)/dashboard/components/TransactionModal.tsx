import { Button } from '@/components/Button';
import { CategorySelect } from '@/components/CategorySelect';
import { transactionService } from '@/services/transactionService';
import { TransactionType } from '@/types/transaction';
import { TransactionForm, transactionSchema } from '@/utils/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Modal } from '../../../../components/Modal';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const TransactionModal: React.FC<TransactionModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const queryClient = useQueryClient();

  const createTransactionMutation = useMutation({
    mutationFn: transactionService.createTransaction,
    onSuccess: () => {
      console.log('Transação criada com sucesso');

      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['balance'] });
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setError,
  } = useForm<TransactionForm>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: 'expense',
      date: new Date().toISOString().split('T')[0],
    },
  });

  const onSubmit = async (data: TransactionForm) => {
    createTransactionMutation.mutate(data, {
      onError: (error) => {
        setError('root', {
          message: error.message || 'Erro ao criar transação. Tente novamente.',
        });
      },
      onSuccess: () => {
        reset();
        onSuccess?.();
        onClose();
      },
    });
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal title="Nova Transação" isOpen={isOpen} onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descrição *
          </label>
          <input
            {...register('description')}
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Descrição da transação"
            disabled={createTransactionMutation.isPending}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Valor *
          </label>
          <input
            {...register('amount', { valueAsNumber: true })}
            type="number"
            step="0.01"
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="0,00"
            disabled={createTransactionMutation.isPending}
          />
          {errors.amount && (
            <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo *
          </label>
          <select
            {...register('type')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={createTransactionMutation.isPending}
          >
            <option value={TransactionType.EXPENSE}>Despesa</option>
            <option value={TransactionType.INCOME}>Receita</option>
          </select>
          {errors.type && (
            <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Data *
          </label>
          <input
            {...register('date')}
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={createTransactionMutation.isPending}
          />
          {errors.date && (
            <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium text-gray-700">
              Categoria
            </label>
          </div>
          <Controller
            name="categoryId"
            control={control}
            render={({ field }) => (
              <CategorySelect
                value={field.value}
                onChange={field.onChange}
                disabled={createTransactionMutation.isPending}
              />
            )}
          />
        </div>

        {(errors.root || createTransactionMutation.error) && (
          <div className="text-red-600 text-sm">
            {errors.root?.message || 'Erro ao criar transação'}
          </div>
        )}

        <div className="flex gap-3 pt-4">
          {
            <Button
              type="button"
              // variant="outline"
              onClick={handleClose}
              disabled={createTransactionMutation.isPending}
              className="flex-1"
            >
              Cancelar
            </Button>
          }
          <Button
            type="submit"
            disabled={createTransactionMutation.isPending}
            className="flex-1"
          >
            {createTransactionMutation.isPending
              ? 'Criando...'
              : 'Criar Transação'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
