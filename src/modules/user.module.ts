import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserController } from "src/controllers/user.controller";
import { UserService } from "src/services/user.service";
import { User, UserSchema } from "src/models/user.model";



@Module({
    imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
    controllers: [UserController],
    providers: [UserService],
    })
export class UserModule {}
