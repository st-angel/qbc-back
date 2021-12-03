import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { CreateQuoteRequestDTO } from './quote.model';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PrivAuthGuard } from '../authorisation/guards/priv-auth.guard';
import { Privileges } from '../authorisation/decorators/privilege.decorator';

import { QUOTES_PRIV } from './quote.privileges';

@Controller()
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Post('quoterequests')
  @UseGuards(JwtAuthGuard, PrivAuthGuard)
  @Privileges(QUOTES_PRIV.CREATE_QUOTES)
  async createQuoteRequest(@Body() quoteRequest: CreateQuoteRequestDTO) {
    const newQuoteRequest = await this.quoteService.create(quoteRequest);

    return newQuoteRequest;
  }
}
