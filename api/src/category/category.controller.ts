import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwat-auth.guard';
import { swagger } from 'src/swagger';
import { UserDecorator } from 'src/user/user.decorator';
import { User } from 'src/user/user.entity';
import { CategoryService } from './category.service';
import { NewCategoryDto } from './dto/newCategoryDto';

@ApiTags('Categorias')
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @ApiBearerAuth()
  @ApiOperation(swagger.category.create.operation)
  @ApiBody({ type: NewCategoryDto })
  @ApiResponse(swagger.category.create.response.success)
  @ApiResponse(swagger.category.create.response.conflict)
  @ApiResponse(swagger.category.create.response.badRequest)
  @ApiResponse(swagger.category.create.response.unauthorized)
  async createCategory(
    @Body() newCategory: NewCategoryDto,
    @UserDecorator() user: User,
  ) {
    return this.categoryService.createCategory(user.id, newCategory);
  }

  @UseGuards(JwtAuthGuard)
  @Get('list')
  @ApiBearerAuth()
  @ApiOperation(swagger.category.list.operation)
  @ApiResponse(swagger.category.list.response.success)
  @ApiResponse(swagger.category.list.response.unauthorized)
  async getCategoriesByUserId(@UserDecorator() user: User) {
    return this.categoryService.getCategoriesByUserId(user.id);
  }
}
