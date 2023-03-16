import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { WalletService } from "src/services/wallet.service";


@Controller('users/:userId/wallets')
export class WalletController {

constructor(private readonly walletService: WalletService ) {}
//add a wallet for a user
@Post()
async createWallet( 
    @Body('name') name: string,
    @Body('balance') balance: number,
    @Body('userId') userId: string,
) {
    const generatedId = await this.walletService.createWallet(name, balance,  userId);
    return { id: generatedId };

}


@Get(':id')
async findOneWallet(@Param('id') walletId: string) {
 const wallet = await this.walletService.findOneWallet(walletId);
    return wallet;
}

}