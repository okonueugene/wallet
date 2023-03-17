import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wallet, WalletSummary } from 'src/models/wallet.model';
import { UserService } from './user.service';

@Injectable()
export class WalletService {
  private wallets: Wallet[] = [];

  constructor(
    @InjectModel('Wallet') private readonly walletModel: Model<Wallet>,
    private readonly userService: UserService,
  ) {}

    async createWallet(userId: string, name: string, balance: number) {
    const user = await this.userService.findOneUser(userId);
    if (!user) {
        throw new NotFoundException('User not found');
    }
    const newWallet = new this.walletModel({
        name: name,
        balance: balance,
        user: user
    });
    const result = await newWallet.save();
    return result.id as string;
    }

  async findAllWallets(userId: string) {
    const user = await this.userService.findOneUser(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const wallets = await this.walletModel.find({ user: user }).exec();
    return wallets.map((wallet) => ({
      id: wallet.id,
      name: wallet.name,
      balance: wallet.balance,
      user: wallet.user,
    }));
  }

  async findOneWallet(walletId: string) {
    let wallet;
    try {
      wallet = await this.walletModel.findById(walletId ).exec();
    } catch (error) {
      throw new NotFoundException('Could not find wallet');
    }
    if (!wallet) {
      throw new NotFoundException('Could not find wallet');
    }

    return wallet;
  }

  async getWalletSummariesForUser(userId: string): Promise<WalletSummary[]> {
    const summaries = await this.walletModel.aggregate([
      {
        $match: { user: userId },
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
      },
    ]);
    return summaries;
  }
}
