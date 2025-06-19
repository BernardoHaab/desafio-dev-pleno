import { LucideIcon } from 'lucide-react';
import { formatCurrency } from '../../../utils/formatters';

interface BalanceCardProps {
  title: string;
  amount: number;
  icon: LucideIcon;
  iconColor: string;
  textColor: string;
}

export function BalanceCard({
  title,
  amount,
  icon: Icon,
  iconColor,
  textColor,
}: BalanceCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center">
        <Icon className={`w-8 h-8 ${iconColor}`} />
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-2xl font-bold ${textColor}`}>
            {formatCurrency(amount)}
          </p>
        </div>
      </div>
    </div>
  );
}
