import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Plan } from './plan.model';

@Injectable()
export class PlanService {
  constructor(@InjectModel('Plan') private readonly planMoDB: Model<Plan>) {}

  async list() {
    const plans = this.planMoDB.find().exec();

    return plans;
  }

  async getPlanById(planId: string) {
    const plan = (await this.planMoDB.find().exec()).filter(
      (p) => p.get('planId') === planId,
    );

    return plan;
  }
}
