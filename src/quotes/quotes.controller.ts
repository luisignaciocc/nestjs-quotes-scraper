import { Controller, Get } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Controller('quotes')
export class QuotesController {
  constructor(
    @InjectQueue('scraper')
    private readonly scrapingQueue: Queue,
  ) {}

  @Get('scrape')
  async scrape() {
    return await this.scrapingQueue.add('scrape-default');
  }
}
