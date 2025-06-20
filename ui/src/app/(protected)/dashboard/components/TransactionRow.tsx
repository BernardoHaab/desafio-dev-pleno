import { Transaction, TransactionType } from '@/types/transaction';
import { formatCurrency, formatDate } from '../../../../utils/formatters';

interface TransactionRowProps {
  transaction: Transaction;
}

export function TransactionRow({ transaction }: TransactionRowProps) {
  return (
    <tr key={transaction.id}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">
          {transaction.description}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {transaction.category && (
          <span
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white"
            style={{ backgroundColor: transaction.category.color }}
            title={
              transaction.category.description || transaction.category.name
            }
          >
            {transaction.category.name}
          </span>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {formatDate(transaction.date)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`text-sm font-medium ${
            transaction.type === TransactionType.INCOME
              ? 'text-green-600'
              : 'text-red-600'
          }`}
        >
          {transaction.type === TransactionType.INCOME ? '+' : '-'}
          {formatCurrency(transaction.amount)}
        </span>
      </td>
    </tr>
  );
}
