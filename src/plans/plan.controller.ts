import { Controller, Get, UseGuards, Param } from '@nestjs/common';

import { PlanService } from './plan.service';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PrivAuthGuard } from '../authorisation/guards/priv-auth.guard';
import { Privileges } from '../authorisation/decorators/privilege.decorator';

import { PLANS_PRIV } from './plan.privileges';

@Controller()
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Get('plans')
  @UseGuards(JwtAuthGuard, PrivAuthGuard)
  @Privileges(PLANS_PRIV.LIST_PLANS)
  async listAllPlans() {
    const plans = await this.planService.list();
    return plans;
  }

  @Get('plans/:id')
  @UseGuards(JwtAuthGuard, PrivAuthGuard)
  @Privileges(PLANS_PRIV.LIST_PLANS)
  async retrievePlanById(@Param('id') id: string) {
    const plan = await this.planService.getPlanById(id);
    return plan;
  }
}
