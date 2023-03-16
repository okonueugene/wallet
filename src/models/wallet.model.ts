import *  as  mongoose from 'mongoose';
import { Transaction } from './transaction.model';
import { User } from './user.model';

export const WalletSchema = new mongoose.Schema({
    name: { type: String, required: true },
    balance: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }]
});

export interface Wallet extends mongoose.Document {
    id: string;
    name: string;
    balance: number;
    user: string | User;
    transactions: Transaction[];


}
export interface WalletSummary {
    id: string;
    name: string;
    balance: number;
 
}


