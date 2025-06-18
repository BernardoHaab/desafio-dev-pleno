import { Injectable } from '@nestjs/common';
import {
  CreateTransactionData,
  TransactionRepository,
} from './repository/transaction.repository.interface';
import { BalanceSummary, Transaction } from './transaction.entity';

@Injectable()
export class TransactionService {
  constructor(private transactionRepository: TransactionRepository) {}

  async create(
    userId: number,
    data: CreateTransactionData,
  ): Promise<Transaction> {
    return this.transactionRepository.create(userId, data);
  }

  async findAll(userId: number): Promise<Transaction[]> {
    return this.transactionRepository.findAll(userId);
  }

  async getBalance(userId: number): Promise<BalanceSummary> {
    return this.transactionRepository.getBalanceBy(userId);
  }
}
