import { ConflictException, Injectable } from '@nestjs/common';
import { NewCategoryDto } from './dto/newCategoryDto';
import { CategoryRepository } from './repository/category.repository.interface';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async createCategory(userId: number, newCategory: NewCategoryDto) {
    const duplicatedCategory = await this.categoryRepository.existsByName(
      userId,
      newCategory.name,
    );

    if (duplicatedCategory) {
      throw new ConflictException(
        `Category with name "${newCategory.name}" already exists for user with ID ${userId}`,
      );
    }

    return this.categoryRepository.create(userId, {
      name: newCategory.name,
      description: newCategory.description || undefined,
      color: newCategory.color,
    });
  }

  getCategoriesByUserId(userId: number) {
    return this.categoryRepository.findByUserId(userId);
  }
}
