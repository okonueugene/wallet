import * as mongoose from 'mongoose';


export const TransactionSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    type: {type: String, enum:['income','expense'], required: true},
    description : {type: String, required: true},
    wallet: { type: mongoose.Schema.Types.ObjectId, ref: 'Wallet' },
    date : {type: Date, default: Date.now}
});

export interface Transaction extends mongoose.Document {
    id: string;
    amount: number;
    type: 'income' | 'expense';
    description: string;
    wallet: string;
    date: Date;
}