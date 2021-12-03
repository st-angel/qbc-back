import { Injectable, NotFoundException } from '@nestjs/common';

import { Asset } from '../assets/asset.model';
import { AssetService } from '../assets/asset.service';

import { PlanService } from '../plans/plan.service';
import { Plan } from '../plans/plan.model';

import { CreateQuoteRequestDTO } from './quote.model';

@Injectable()
export class QuoteService {
  constructor(
    private readonly assetService: AssetService,
    private readonly planService: PlanService,
  ) {}

  /* Returns a new quote request object */
  async create(newQuoteRequest: CreateQuoteRequestDTO) {
    const asset = await this.getAssetForQuote(newQuoteRequest);
    if (!asset) {
      throw new NotFoundException();
    }

    const dummyQuoteReq = {
      assetId: newQuoteRequest.assetId,
      assetValue: newQuoteRequest.assetValue,
      clientId: newQuoteRequest.clientId,
      clientAge: newQuoteRequest.clientAge,
      quotes: [],
    };
    const plandIds = await this.getPlanForQuote();
    for (let pId of plandIds) {
      const plan = await this.planService.getPlanById(pId);
      const ppY = this.getYearlyQuotePrice(
        plan[0],
        asset,
        newQuoteRequest.assetValue,
      );

      const ppM = ppY / 12;
      const quote = {
        planId: pId,
        pricePerMonth: ppM,
        pricePerYear: ppY,
      };
      dummyQuoteReq.quotes.push(quote);
    }

    return dummyQuoteReq;
  }

  private async getPlanForQuote() {
    const plans = await this.planService.list();
    const planIds = plans.map((e) => {
      return e.get('planId');
    });

    return planIds;
  }

  private async getAssetForQuote(newQuoteRequest: CreateQuoteRequestDTO) {
    const asset = await this.assetService.getAssetById(newQuoteRequest.assetId);

    return asset;
  }

  /*Compute the price according to the business rules.*/
  private getYearlyQuotePrice(
    plan: Plan,
    asset: Asset,
    assetValue: number,
  ): number {
    return (
      asset.assetPrice +
      asset.assetPercentage * plan.percentageMultiplier * assetValue
    );
  }
}
