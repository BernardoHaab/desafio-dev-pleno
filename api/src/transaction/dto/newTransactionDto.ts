import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { TransactionType } from '../transaction.entity';

export class NewTransactionDto {
  @IsString()
  description: string;

  @IsNumber()
  amount: number;

  @IsEnum(TransactionType)
  type: TransactionType;

  @IsDateString()
  date: string;

  @IsOptional()
  @IsNumber()
  categoryId?: number;
}
