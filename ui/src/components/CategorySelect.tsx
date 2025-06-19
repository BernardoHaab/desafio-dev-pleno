import { useCategories } from '@/hooks/useCategory';

interface CategorySelectProps {
  value?: number;
  onChange: (categoryId?: number) => void;
  disabled?: boolean;
}

export function CategorySelect({
  value,
  onChange,
  disabled = false,
}: CategorySelectProps) {
  const { data: categories = [], isLoading, error } = useCategories();

  if (isLoading) {
    return (
      <select
        disabled
        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
      >
        <option>Carregando categorias...</option>
      </select>
    );
  }

  if (error) {
    return (
      <select
        disabled
        className="w-full px-3 py-2 border border-red-300 rounded-md bg-red-50"
      >
        <option>Erro ao carregar categorias</option>
      </select>
    );
  }

  return (
    <select
      value={value || ''}
      onChange={(e) =>
        onChange(e.target.value ? Number(e.target.value) : undefined)
      }
      disabled={disabled}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    >
      <option value="">Selecione uma categoria</option>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  );
}
