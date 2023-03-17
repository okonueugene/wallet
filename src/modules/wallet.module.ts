import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { WalletController } from "src/controllers/wallet.controller";
import { UserSchema } from "src/models/user.model";
import { Wallet, WalletSchema } from "src/models/wallet.model";
import { UserService } from "src/services/user.service";
import { WalletService } from "src/services/wallet.service";


@Module({
    imports: [MongooseModule.forFeature([{ name: 'Wallet', schema: WalletSchema }]), 
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
    controllers: [WalletController],
    providers: [WalletService, UserService],
    exports: [WalletService]
})
export class WalletModule {}
