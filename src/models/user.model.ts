import * as mongoose from 'mongoose';
import { Wallet, WalletSummary } from '../models/wallet.model';

export const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    wallets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Wallet' }]
});

export interface User extends mongoose.Document {
    id: string;
    name: string;
    email: string;
    password: string;
    wallets: Wallet[]
}


export interface Profile  {
    id: string;
    name: string;
    email: string;
    overallBalance: number;
    wallets: WalletSummary[];
}

