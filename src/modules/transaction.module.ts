import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { TransactionController } from "src/controllers/transaction.controller";
import { TransactionSchema } from "src/models/transaction.model";
import { WalletSchema } from "src/models/wallet.model";
import { TransactionService } from "src/services/transaction.service";
import { WalletService } from "src/services/wallet.service";
import { WalletModule } from "./wallet.module";
import { UserModule } from "./user.module";

@Module({
    imports: [
        WalletModule,UserModule,
        MongooseModule.forFeature([{ name: 'Transaction', schema: TransactionSchema }]),
        MongooseModule.forFeature([{ name: 'Wallet', schema: WalletSchema }])
    ],
    controllers: [TransactionController],
    providers: [TransactionService, WalletService]
})
export class TransactionModule {}
