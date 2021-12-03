import { IsNumber, IsNotEmpty, Min } from 'class-validator';
import * as mongoose from 'mongoose';

import { QUOTE_CONFIG } from './config/quote.config';
import { AGE_25_WITH_PORSCHE_RISK } from './validators/risks/Age25WithPorsche.risk';
import { IsMinAndValueRisk } from './validators/IsMinAndValueRisk.validator';

export interface Quote {
  quoteId: string;
  planId: string;
  pricePerYear: number;
  pricePerMonth: number;
}

export interface QuoteRequest {
  //quoteReqId: string;

  assetId: string;
  assetValue: number;

  clientId: string;
  clientAge: number;

  quotes: Quote[];
}

export class CreateQuoteRequestDTO {
  //quoteReqId: string;

  @IsNotEmpty()
  assetId: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(QUOTE_CONFIG.MIN_ASSET_VALUE)
  assetValue: number;

  clientId: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(QUOTE_CONFIG.MIN_CLIENT_AGE)
  //Check for the risk of Porsche and driver age < 25 years
  @IsMinAndValueRisk('assetId', AGE_25_WITH_PORSCHE_RISK)
  clientAge: number;
}

export const quoteRequestMoDB = new mongoose.Schema(
  {
    //quoteReqId: { type: String },

    assetId: { type: String, required: true },
    assetValue: { type: Number, required: true },

    clientId: { type: String },
    clientAge: { type: Number, required: true },

    quotes: { type: Array },
  },
  { collection: 'quotes' },
);
