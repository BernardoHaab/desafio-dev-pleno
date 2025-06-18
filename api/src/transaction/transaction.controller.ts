import {
  Body,
  ConflictException,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwat-auth.guard';
import { CategoryService } from 'src/category/category.service';
import { UserDecorator } from 'src/user/user.decorator';
import { User } from 'src/user/user.entity';
import { NewTransactionDto } from './dto/newTransactionDto';
import { CreateTransactionData } from './repository/transaction.repository.interface';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(
    private transactionService: TransactionService,
    private categoryService: CategoryService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
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
  async getAllTransactions(@UserDecorator() user: User): Promise<any> {
    return this.transactionService.findAll(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('balance')
  async getBalance(@UserDecorator() user: User): Promise<any> {
    return this.transactionService.getBalance(user.id);
  }
}
