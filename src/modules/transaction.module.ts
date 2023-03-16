import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { TransactionController } from "src/controllers/transaction.controller";
import { TransactionSchema } from "src/models/transaction.model";
import { WalletSchema } from "src/models/wallet.model";
import { TransactionService } from "src/services/transaction.service";



@Module({
    imports:[MongooseModule.forFeature([{ name: 'Transaction', schema: TransactionSchema }]),MongooseModule.forFeature([{ name: 'Wallet', schema: WalletSchema }])],
    controllers: [TransactionController],
    providers: [TransactionService]
    
})

export class TransactionModule {}