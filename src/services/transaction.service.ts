import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Transaction } from "src/models/transaction.model";
import { WalletService } from "src/services/wallet.service";

@Injectable()
export class TransactionService {

    constructor(
        @InjectModel('Transaction') private transactionModel: Model<Transaction>,
        private readonly walletService: WalletService 
    ) {}

    async createTransaction(userId: string, walletId: string, amount: number, type: 'income' | 'expense', description: string) {
        const newTransaction = new this.transactionModel({
            user: userId, 
            amount: amount,
            type: type,
            description: description,
            wallet: walletId,
            date: new Date()
        });
        const result = await newTransaction.save();
        const wallet = await this.walletService.findOneWallet(walletId); 
        if (type === 'income') {
            wallet.balance += amount;
        } else {
            wallet.balance -= amount;
        }
        await wallet.save();
        return result.id as string;
    }

    async findTransactionsByWalledId(walletId: string) {
        const transactions = await this.transactionModel.find({wallet: walletId}).exec();
        return transactions.map(transaction => ({
            id: transaction.id,
            amount: transaction.amount,
            type: transaction.type,
            description: transaction.description,
            wallet: transaction.wallet,
            date: transaction.date
        }));
    }
}
