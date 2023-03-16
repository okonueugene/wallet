import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';



@Schema()
export class User {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Wallet'}] })
    wallets: Types.ObjectId[];

    
}   
export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);