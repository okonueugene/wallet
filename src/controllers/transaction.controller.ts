import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { TransactionService } from "src/services/transaction.service";
import { WalletService } from "src/services/wallet.service";



@Controller('users/:userId/wallets/:walletId/transactions')
export class TransactionController {

    constructor(private readonly transactionService: TransactionService,
        private readonly walletService: WalletService) { }

    @Post()
    async addTransaction(
        @Param('userId') userId: string,
        @Param('walletId') walletId: string,
        @Body('amount') amount: number,
        @Body('type') type: 'income' | 'expense',
        @Body('description') description: string,
    ) {
        const generatedId = await this.transactionService.createTransaction(userId, walletId, amount, type, description);
        return { id: generatedId };
    }

    @Get(':id')
    async findOneWallet(@Param('id') walletId: string) {
      const wallet = await this.walletService.findOneWallet(walletId);
      const transactions = await this.transactionService.findTransactionsByWalledId(walletId);
        return {wallet, transactions};
      
    }


}