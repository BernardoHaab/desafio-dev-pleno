import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryRepository } from './repository/category.repository.interface';
import { PrismaCategoryRepository } from './repository/cateogri-prisma.repository';

@Module({
  imports: [],
  controllers: [CategoryController],
  providers: [
    PrismaService,
    CategoryService,
    { provide: CategoryRepository, useClass: PrismaCategoryRepository },
  ],
})
export class categoryModule {}
