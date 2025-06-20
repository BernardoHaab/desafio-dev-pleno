import { Button } from '@/components/Buttons';
import { useCreateCategory } from '@/hooks/useCategory';
import { colorOptions } from '@/utils/colors';
import { CategoryForm, categorySchema } from '@/utils/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from '../../../../components/Modal';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CategoryModal: React.FC<CategoryModalProps> = ({
  isOpen,
  onClose,
}) => {
  const createCategoryMutation = useCreateCategory();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<CategoryForm>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      color: colorOptions[0],
    },
  });

  const selectedColor = watch('color');

  const onSubmit = async (data: CategoryForm) => {
    try {
      await createCategoryMutation.mutateAsync(data);
      handleClose();
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal title="Nova Categoria" isOpen={isOpen} onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nome *
          </label>
          <input
            {...register('name')}
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Nome da categoria"
            disabled={createCategoryMutation.isPending}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descrição
          </label>
          <textarea
            {...register('description')}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Descrição da categoria (opcional)"
            disabled={createCategoryMutation.isPending}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cor *
          </label>
          <div className="grid grid-cols-10 gap-2">
            {colorOptions.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setValue('color', color)}
                className={`w-8 h-8 rounded-full border-2 ${
                  selectedColor === color
                    ? 'border-gray-800 scale-110'
                    : 'border-gray-300'
                } transition-all duration-200`}
                style={{ backgroundColor: color }}
                disabled={createCategoryMutation.isPending}
              />
            ))}
          </div>
          {errors.color && (
            <p className="mt-1 text-sm text-red-600">{errors.color.message}</p>
          )}
        </div>

        {createCategoryMutation.error && (
          <div className="text-red-600 text-sm">
            Erro ao criar categoria. Tente novamente.
          </div>
        )}

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            // variant="outline"
            onClick={handleClose}
            disabled={createCategoryMutation.isPending}
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={createCategoryMutation.isPending}
            className="flex-1"
          >
            {createCategoryMutation.isPending
              ? 'Criando...'
              : 'Criar Categoria'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
