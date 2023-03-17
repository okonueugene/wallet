import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { WalletService } from "src/services/wallet.service";


@Controller('users/:userId/wallets')
export class WalletController {

constructor(private readonly walletService: WalletService ) {}
//add a wallet for a user
@Post()
async addWallet(
    @Param('userId') userId: string,
    @Body('name') name: string,
    @Body('balance') balance: number,
) {
    const generatedId = await this.walletService.createWallet(userId, name, balance);
    return { id: generatedId };
}

@Get()
async findAllWallets(@Param('userId') userId: string) {
    const wallets = await this.walletService.findAllWallets(userId);
    return wallets;
}

@Get(':id')
async findOneWallet(@Param('id') walletId: string) {
 const wallet = await this.walletService.findOneWallet(walletId);
    return wallet;
}



}