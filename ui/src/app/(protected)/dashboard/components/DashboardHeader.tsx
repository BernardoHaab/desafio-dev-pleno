import { PlusCircle } from 'lucide-react';
import { Button } from '../../../../components/Buttons';

interface DashboardHeaderProps {
  onAddTransaction?: () => void;
  onAddCategory?: () => void;
}

export function DashboardHeader({
  onAddTransaction,
  onAddCategory,
}: DashboardHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">Dashboard Financeiro</h1>
      <div className="flex space-x-4">
        <Button onClick={onAddCategory}>
          <PlusCircle className="w-4 h-4 mr-2" />
          Nova Categoria
        </Button>
        <Button onClick={onAddTransaction}>
          <PlusCircle className="w-4 h-4 mr-2" />
          Nova Movimentação
        </Button>
      </div>
    </div>
  );
}
