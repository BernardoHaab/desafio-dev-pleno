import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwat-auth.guard';
import { UserDecorator } from 'src/user/user.decorator';
import { User } from 'src/user/user.entity';
import { CategoryService } from './category.service';
import { NewCategoryDto } from './dto/newCategoryDto';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createCategory(
    @Body() newCategory: NewCategoryDto,
    @UserDecorator() user: User,
  ) {
    return this.categoryService.createCategory(user.id, newCategory);
  }

  @UseGuards(JwtAuthGuard)
  @Post('list')
  async getCategoriesByUserId(@UserDecorator() user: User) {
    return this.categoryService.getCategoriesByUserId(user.id);
  }
}
