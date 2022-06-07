import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import * as fs from 'fs/promises';
import * as cheerio from 'cheerio';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

@Injectable()
export class WesternDigitalStorageScrapService {
  constructor(private readonly axios: HttpService) {}

  public async getStorages(): Promise<any[]> {
    const storages = [];

    try {
      const { data } = await lastValueFrom(
        this.axios.get(
          'https://api.westerndigital.com/wdwebservices/v2/us/products/search',
          {
            params: {
              fields: 'FULL',
              pageSize: 1000,
              query:
                ':relevance:category:cat_internal:brandCode:GT:brandCode:WD:brandCode:WDC:brandCode:SD',
              customQuery:
                '*:* AND -optionalCondition_en_string_mv:*outlet* OR -optionalCondition_en_string_mv:*recertified*',
              lang: 'es_CO',
            },
          },
        ),
      );
      const storageList = await this.readStorages(data);
      storages.push(...storageList);
    } catch (error) {
      console.error(error);
    }
    await fs.writeFile(
      'results/storages/western-digital.json',
      JSON.stringify(storages.flatMap((s) => s)),
    );
    return storages;
  }

  private async readStorages(content: any): Promise<any> {
    const { products } = content;
    const storages = await Promise.all(
      products.map((p) => this.extractStoragesInfo(p)),
    );
    return storages.filter((s) => s !== null);
  }

  private async extractStoragesInfo(content: any) {
    const { code } = content;
    const url = `https://www.westerndigital.com/es-la/products/internal-drives/${code}`;
    const storageDetail = await this.getStorageDetail(url);
    return storageDetail;
  }

  private async getStorageDetail(url: string) {
    try {
      await sleep(2000);
      const { data } = await lastValueFrom(this.axios.get(url));
      return this.extractStorageDetail(data);
    } catch (error) {
      return null;
    }
  }

  private async extractStorageDetail(content: any) {
    const $ = cheerio.load(content);
    const imageInfo = JSON.parse(
      $('div[productimages-dir]').attr('data-productimagesjson-string'),
    );
    const storageInfo = $('div[productattributes-dir]').map((_, el) => {
      const $el = $(el);
      const id = $el.attr('data-sku').trim();
      const data = $el.attr('data-productattributes').trim();

      return {
        id,
        ...JSON.parse(data),
        image: imageInfo[id],
      };
    });
    return storageInfo.toArray();
  }
}
