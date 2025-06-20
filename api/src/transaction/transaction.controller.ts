import {
  Body,
  ConflictException,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwat-auth.guard';
import { CategoryService } from 'src/category/category.service';
import { swagger } from 'src/swagger';
import { UserDecorator } from 'src/user/user.decorator';
import { User } from 'src/user/user.entity';
import { NewTransactionDto } from './dto/newTransactionDto';
import { CreateTransactionData } from './repository/transaction.repository.interface';
import { TransactionService } from './transaction.service';

@ApiTags('Transações')
@Controller('transaction')
export class TransactionController {
  constructor(
    private transactionService: TransactionService,
    private categoryService: CategoryService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @ApiBearerAuth()
  @ApiOperation(swagger.transaction.create.operation)
  @ApiBody({ type: NewTransactionDto })
  @ApiResponse(swagger.transaction.create.response.success)
  @ApiResponse(swagger.transaction.create.response.conflict)
  @ApiResponse(swagger.transaction.create.response.badRequest)
  @ApiResponse(swagger.transaction.create.response.unauthorized)
  async createTransaction(
    @UserDecorator() user: User,
    @Body() newTransaction: NewTransactionDto,
  ): Promise<any> {
    if (newTransaction.categoryId) {
      const hasCategory = await this.categoryService.hasCategory(
        user.id,
        newTransaction.categoryId,
      );

      if (!hasCategory) {
        throw new ConflictException(
          `A categoria com o ID ${newTransaction.categoryId} não existe.`,
        );
      }
    }

    const formattedTransaction: CreateTransactionData = {
      ...newTransaction,
      date: new Date(newTransaction.date),
    };

    return this.transactionService.create(user.id, formattedTransaction);
  }

  @UseGuards(JwtAuthGuard)
  @Get('list')
  @ApiBearerAuth()
  @ApiOperation(swagger.transaction.list.operation)
  @ApiResponse(swagger.transaction.list.response.success)
  @ApiResponse(swagger.transaction.list.response.unauthorized)
  async getAllTransactions(@UserDecorator() user: User): Promise<any> {
    return this.transactionService.findAll(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('balance')
  @ApiBearerAuth()
  @ApiOperation(swagger.transaction.balance.operation)
  @ApiResponse(swagger.transaction.balance.response.success)
  @ApiResponse(swagger.transaction.balance.response.unauthorized)
  async getBalance(@UserDecorator() user: User): Promise<any> {
    return this.transactionService.getBalance(user.id);
  }
}
