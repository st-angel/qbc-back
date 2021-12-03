import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PlanController } from './plan.controller';
import { PlanService } from './plan.service';
import { planSchema } from './schema/plan.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Plan', schema: planSchema }])],
  controllers: [PlanController],
  providers: [PlanService],
  exports: [PlanService],
})
export class PlanModule {}
