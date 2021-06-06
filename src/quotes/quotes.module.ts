import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { QuotesController } from './quotes.controller';
import { QuotesProcessor } from './quotes.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'scraper',
    }),
  ],
  controllers: [QuotesController],
  providers: [QuotesProcessor],
})
export class QuotesModule {}
