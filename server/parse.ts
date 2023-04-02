import puppeteer, { PuppeteerLaunchOptions } from 'puppeteer';
import { WebItemRequest, WebItemResponse } from './types';

export async function parseWebItems(
  url: string,
  items: WebItemRequest[],
): Promise<WebItemResponse[]> {
  // unsafe with --no-sandbox argument
  const browser = await puppeteer.launch({
    executablePath: process.env['CHROMIUM_BIN'],
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();

  await page.goto(url);

  const promises = items.map((item) => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(`[server]: waiting for xpath: ${item.name}`);
        await page.waitForXPath(item.xpath, { timeout: 60000});

        console.log(`[server]: getting element with xpath '${item.xpath}'`)
        const elHandle = await page.$x(item.xpath);

        console.log(`[server]: evaluating xpath '${item.xpath}'`)
        const value = await page.evaluate((el) => el.textContent, elHandle[0]);
        console.log(`[server]: retrieved value for ${item.name} is '${value}'`);
        resolve(value);
      } catch (err) {
        console.log(
          `[server]: error parsing xpath '${item.xpath} for ${item.name}: ${err}`,
        );
        reject(err);
      }
    })
      .then(
        (value): WebItemResponse => ({
          name: item.name,
          value: value as string,
        }),
      )
      .catch((err): WebItemResponse => ({ name: item.name, value: 'ERROR' }));
  });

  const responses = await Promise.all(promises);

  await browser.close();

  return responses;
}
