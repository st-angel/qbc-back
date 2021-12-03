import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

import { AssetModule } from './assets/asset.module';
import { PlanModule } from './plans/plan.module';
import { QuoteModule } from './quotes/quote.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://rouser:wLaqm076MyXKHcUr@mongocluster.ornnn.mongodb.net/qDB?retryWrites=true&w=majority',
    ),

    AuthModule,
    UsersModule,
    AssetModule,
    PlanModule,
    QuoteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
