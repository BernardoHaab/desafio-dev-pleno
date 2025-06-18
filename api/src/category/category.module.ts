import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { PrismaCategoryRepository } from './repository/category-prisma.repository';
import { CategoryRepository } from './repository/category.repository.interface';

@Module({
  imports: [],
  controllers: [CategoryController],
  providers: [
    PrismaService,
    CategoryService,
    { provide: CategoryRepository, useClass: PrismaCategoryRepository },
  ],
  exports: [
    CategoryService,
    { provide: CategoryRepository, useClass: PrismaCategoryRepository },
  ],
})
export class categoryModule {}
