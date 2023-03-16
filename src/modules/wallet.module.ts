import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { WalletController } from "src/controllers/wallet.controller";
import { WalletSchema } from "src/models/wallet.model";
import { WalletService } from "src/services/wallet.service";


@Module({
    imports: [MongooseModule.forFeature([{ name: 'Wallet', schema: WalletSchema }])],
    controllers: [WalletController],
    providers: [WalletService],
    exports: [WalletService]
})
export class WalletModule {}