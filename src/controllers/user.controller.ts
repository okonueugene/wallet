import { Controller, Get, Post, Body, Param } from '@nestjs/common';

import { UserService } from '../services/user.service';
import { WalletService } from 'src/services/wallet.service';
import { Profile } from 'src/models/user.model';

@Controller('users')
export class UserController {

    constructor(
        private readonly userService: UserService,
        private readonly walletService: WalletService,
    ) { }

    @Post()
    async addUser(
        @Body('name') name: string,
        @Body('email') email: string,
        @Body('password') password: string,
    ) {
        const generatedId = await this.userService.createUser(name, email, password);
        return { id: generatedId };

    }

    @Get()
    async findAllUsers() {
        const users = await this.userService.findAllUsers();
        return users;
    }
    //find a user by id
    @Get(':id')
    async findOneUser(@Param('id') userId: string) {
        const user = await this.userService.findOneUser(userId);
        return user;
    }

    @Get(':id/profile')

    async getProfile(@Param('id') userId: string) : Promise< Profile> {
        const user = await this.userService.findOneUser(userId);

        const walletSummaries = await this.walletService.findAllWallets(userId);
        
        const overAllBalance = walletSummaries.reduce((acc, wallet) => acc + wallet.balance, 0);

        //construct and return the profile
        const profile: Profile = {
            id: user.id,
            name: user.name,
            email: user.email,
            overallBalance: overAllBalance,
            wallets: walletSummaries
        };

        return profile;
    
    }
}