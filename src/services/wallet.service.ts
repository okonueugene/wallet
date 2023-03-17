import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wallet, WalletSummary } from 'src/models/wallet.model';

@Injectable()

export class WalletService {
    [x: string]: any;

    private wallets: Wallet[] = [];

    constructor(@InjectModel('Wallet') private readonly walletModel: Model<Wallet>) { }

    async createWallet(name: string, balance: number, userId: string) {
        const newWallet = new this.walletModel({
            name: name,
            balance: balance,
            user: userId
        });
        const result = await newWallet.save();
        return result.id as string;
    }

    async findAllWallets(userId: string) {
        const wallets = await this.walletModel.find({user: userId}).exec();
        return wallets.map(wallet => ({
            id: wallet.id,
            name: wallet.name,
            balance: wallet.balance,
            user: wallet.user
        }));
    }


    async findOneWallet(userId: string, walletId: string) {
        let wallet;
        try {
            wallet = await this.walletModel.findOne({user: userId,id: walletId }).exec();

        }
        catch (error) {
            throw new NotFoundException('Could not find wallet');
        }
        if (!wallet) {
            throw new NotFoundException('Could not find wallet');
        }

        return wallet;
    }

    async getWalletSummariesForUser(userId: string): Promise<WalletSummary[]>  {
    const summaries = await this.walletModel.aggregate([
        {
            $match: {user: userId},
        },
        {
            $group: {
                _id: '$user',
                wallets: {
                    $push: {
                        id: '$_id',
                        name: '$name',
                        balance: '$balance',
                    },
                },
            },
            
            },  
        {
            $unwind: '$wallets',
        },
        {
            $replaceRoot: {
                newRoot: '$wallets',
            },
        }
    ]);
    return summaries;
    }

}
