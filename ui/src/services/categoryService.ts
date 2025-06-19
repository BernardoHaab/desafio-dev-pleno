import api from '@/lib/api';
import { Category, NewCategoryDto } from '@/types/category';

export const categoryService = {
  getCategories: async (): Promise<Category[]> => {
    const response = await api.get('/category/list');
    return response.data;
  },

  createCategory: async (data: NewCategoryDto): Promise<Category> => {
    const response = await api.post('/category/create', data);
    return response.data;
  },
};
