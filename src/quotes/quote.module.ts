import { Module } from '@nestjs/common';

import { AssetModule } from '../assets/asset.module';
import { PlanModule } from '../plans/plan.module';

import { QuoteController } from './quote.controller';
import { QuoteService } from './quote.service';

@Module({
  imports: [AssetModule, PlanModule],
  controllers: [QuoteController],
  providers: [QuoteService],
})
export class QuoteModule {}
