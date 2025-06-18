import { Category } from '../category.entity';

export interface CreateCategoryData {
  name: string;
  description?: string;
  color?: string;
}

export abstract class CategoryRepository {
  abstract create(userId: number, data: CreateCategoryData): Promise<Category>;
  abstract findByUserId(userId: number): Promise<Category[]>;
  abstract existsByName(userId: number, name: string): Promise<boolean>;
}
