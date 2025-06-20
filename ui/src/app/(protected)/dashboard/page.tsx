'use client';

import { DollarSign, TrendingDown, TrendingUp } from 'lucide-react';
// import { useDashboardQueries } from '@/hooks/useDashboard';
import { BalanceCard } from '@/app/(protected)/dashboard/components/BalanceCard';
import { CategoryModal } from '@/app/(protected)/dashboard/components/CategoryModal';
import { DashboardHeader } from '@/app/(protected)/dashboard/components/DashboardHeader';
import { ErrorCard } from '@/app/(protected)/dashboard/components/ErrorCard';
import { SkeletonCard } from '@/app/(protected)/dashboard/components/SkeletonCard';
import { SkeletonRow } from '@/app/(protected)/dashboard/components/SkeletonRow';
import { TransactionRow } from '@/app/(protected)/dashboard/components/TransactionRow';
import { transactionService } from '@/services/transactionService';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { TransactionModal } from './components/TransactionModal';

export default function DashboardPage() {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState(false);

  const transactionsQuery = useQuery({
    queryKey: ['transactions'],
    queryFn: transactionService.getTransactions,
    initialData: [],
  });

  const balanceQuery = useQuery({
    queryKey: ['balance'],
    queryFn: transactionService.getBalance,
    initialData: { income: 0, expense: 0, balance: 0 },
  });

  const handleAddTransaction = () => {
    setShowTransactionModal(true);
  };

  const handleAddCategory = () => {
    setShowCategoryModal(true);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <DashboardHeader
        onAddTransaction={handleAddTransaction}
        onAddCategory={handleAddCategory}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Receitas Card */}
        {balanceQuery.isFetching ? (
          <SkeletonCard />
        ) : balanceQuery.error ? (
          <ErrorCard message="Erro ao carregar receitas" />
        ) : (
          <BalanceCard
            title="Receitas"
            amount={balanceQuery.data.income}
            icon={TrendingUp}
            iconColor="text-green-500"
            textColor="text-green-600"
          />
        )}

        {/* Despesas Card */}
        {balanceQuery.isFetching ? (
          <SkeletonCard />
        ) : balanceQuery.error ? (
          <ErrorCard message="Erro ao carregar despesas" />
        ) : (
          <BalanceCard
            title="Despesas"
            amount={balanceQuery.data.expense}
            icon={TrendingDown}
            iconColor="text-red-500"
            textColor="text-red-600"
          />
        )}

        {/* Saldo Card */}
        {balanceQuery.isFetching ? (
          <SkeletonCard />
        ) : balanceQuery.error ? (
          <ErrorCard message="Erro ao carregar saldo" />
        ) : (
          <BalanceCard
            title="Saldo"
            amount={balanceQuery.data.balance}
            icon={DollarSign}
            iconColor="text-blue-500"
            textColor={
              balanceQuery.data.balance >= 0 ? 'text-green-600' : 'text-red-600'
            }
          />
        )}
      </div>
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold">Movimentações Recentes</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Descrição
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Categoria
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Valor
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactionsQuery.isFetching ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <SkeletonRow key={`skeleton-${index}`} />
                ))
              ) : transactionsQuery.error ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center">
                    <div className="text-red-600">
                      Erro ao carregar transações. Tente novamente.
                    </div>
                  </td>
                </tr>
              ) : transactionsQuery.data.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    Nenhuma movimentação encontrada
                  </td>
                </tr>
              ) : (
                transactionsQuery.data.map((transaction) => (
                  <TransactionRow
                    key={transaction.id}
                    transaction={transaction}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <CategoryModal
        isOpen={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
      />

      <TransactionModal
        isOpen={showTransactionModal}
        onClose={() => setShowTransactionModal(false)}
      />
    </div>
  );
}
