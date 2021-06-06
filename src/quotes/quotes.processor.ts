import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import puppeteer = require('puppeteer');
import jsdom = require('jsdom');
import { scrapeQuotes } from './utils';

@Processor('scraper')
export class QuotesProcessor {
  private readonly logger = new Logger(QuotesProcessor.name);

  @Process('scrape-default')
  async handleTranscode() {
    this.logger.debug('Start default scraping...');
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    try {
      let hasNextPage = true;
      const baseUrl = 'https://quotes.toscrape.com';
      let url = baseUrl;
      while (hasNextPage) {
        this.logger.debug(`url: ${url}`);
        const response = await page.goto(url);
        const body = await response.text();
        const parsedBody = new jsdom.JSDOM(body);
        const document = parsedBody.window.document;

        const scrapingResult = scrapeQuotes(document);

        this.logger.debug(`${scrapingResult.data.length} quotes found`);

        if (scrapingResult.hasNextPage) {
          url = baseUrl + scrapingResult.nextPageRef;
        }
        hasNextPage = scrapingResult.hasNextPage;
      }
      await browser.close();
    } catch (err) {
      this.logger.error(err);
      await browser.close();
    }
    this.logger.debug('Scraping completed!');
  }
}
