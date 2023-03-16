import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { TransactionService } from "src/services/transaction.service";



@Controller('users/:userId/wallets/:walletId/transactions')
export class TransactionController {
    [x: string]: any;

    constructor(private readonly transactionService: TransactionService) { }

    @Post()
    async createTransaction(
        @Param('userId') userId: string,
        @Param('walletId') walletId: string,
        @Body('amount') amount: number,
        @Body('type') type: 'income' | 'expense',
        @Body('description') description: string,
      
    ) {
    const generatedId = await this.transactionService.createTransaction(userId, walletId, amount, type, description);

    }

    @Get(':id')
    async findOneWallet(@Param('id') walletId: string) {
      const wallet = await this.walletService.findOneWallet(walletId);
      const transactions = await this.transactionService.findTransactionsByWalledId(walletId);
        return {wallet, transactions};
      
    }


}