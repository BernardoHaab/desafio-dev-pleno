import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Category } from '../category.entity';
import {
  CategoryRepository,
  CreateCategoryData,
} from './category.repository.interface';

@Injectable()
export class PrismaCategoryRepository implements CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    userId: number,
    newCategory: CreateCategoryData,
  ): Promise<Category> {
    const category = await this.prisma.category.create({
      data: {
        ...newCategory,
        user: {
          connect: { id: userId },
        },
      },
    });
    return new Category(category);
  }

  async findByUserId(userId: number): Promise<Category[]> {
    const categories = await this.prisma.category.findMany({
      where: { userId },
    });
    return categories.map((category) => new Category(category));
  }

  async existsByName(userId: number, name: string): Promise<boolean> {
    const category = await this.prisma.category.findFirst({
      where: {
        userId,
        name,
      },
    });
    return !!category;
  }

  async findById(userId: number, categoryId: number): Promise<Category | null> {
    const category = await this.prisma.category.findFirst({
      where: {
        id: categoryId,
        userId,
      },
    });
    return category ? new Category(category) : null;
  }

  async hasCategory(userId: number, categoryId: number): Promise<boolean> {
    const category = await this.prisma.category.findFirst({
      where: {
        id: categoryId,
        userId,
      },
    });
    return !!category;
  }
}
