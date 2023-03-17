import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user.module';
import { WalletModule } from './modules/wallet.module';

@Module({
  imports: [UserModule, WalletModule,
    MongooseModule.forRoot('mongodb+srv://root:1234@cluster0.tfquflw.mongodb.net/wallet?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
