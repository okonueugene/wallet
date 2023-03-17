import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "../models/user.model";
import { UserController } from "../controllers/user.controller";
import { UserService } from "../services/user.service";
import { WalletModule } from "./wallet.module";

@Module({
  imports: [
    WalletModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
