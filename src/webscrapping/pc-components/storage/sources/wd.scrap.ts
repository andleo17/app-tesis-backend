import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import * as fs from 'fs/promises';
import * as cheerio from 'cheerio';
import { WesternDigitalStorageModel } from '../models/WesternDigital.model';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

@Injectable()
export class WesternDigitalStorageScrapService {
  constructor(private readonly axios: HttpService) {}

  public async getStorages(): Promise<WesternDigitalStorageModel[]> {
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
    return storages.flatMap((s) => s);
  }

  private async readStorages(content: any) {
    const { products } = content;
    const storages = await Promise.all<WesternDigitalStorageModel>(
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
      return this.extractStorageDetail(data, url);
    } catch (error) {
      return null;
    }
  }

  private getFormFactor(type: string, height: number): string {
    const heightInmm = Math.round(height * 25.4) || 0;
    const formFactors = {
      'SSD M.2 NVMe': {
        0: '2280',
        80: '2280',
        42: '2242',
        60: '2260',
        100: '2.5 Inch',
        176: 'Externa',
      },
      'SSD M.2 SATA': {
        0: '2280',
        80: '2280',
        42: '2242',
        60: '2260',
      },
      'SSD SATA': {
        0: '2.5 Inch',
        100: '2.5 Inch',
        101: '2.5 Inch',
      },
      'HDD SATA': {
        0: '3.5 Inch',
        147: '3.5 Inch',
      },
    };

    return formFactors[type][heightInmm];
  }

  private async extractStorageDetail(content: string, url: string) {
    const $ = cheerio.load(content);
    const imageInfo = JSON.parse(
      $('div[productimages-dir]').attr('data-productimagesjson-string'),
    );
    const model = $('h1').text().trim().split('\n\t\t\t').at(1);
    let type = '';
    if (model.includes('NVMe')) {
      type = 'SSD M.2 NVMe';
    } else if (model.includes('M.2')) {
      type = 'SSD M.2 SATA';
    } else if (model.includes('SSD')) {
      type = 'SSD SATA';
    } else {
      type = 'HDD SATA';
    }
    try {
      const $storageInfo = $('div[productattributes-dir]');

      const storages = $storageInfo.map((_, el) => {
        const $el = $(el);
        const code = $el.attr('data-sku').trim();
        const data = JSON.parse($el.attr('data-productattributes').trim());
        const dimensions = data['txtDimensions']
          ?.split('x')
          .map((d: string) => Number(d.replace('"', '')));
        return {
          haveSink: code.includes('H'),
          code,
          model,
          type,
          formFactor: this.getFormFactor(type, dimensions?.at(0) || 0),
          diskSpeed: Number(data['txtDiskSpeed']?.match(/\d+/)?.at(0)) || null,
          transferRate: Number(data['txtTransferRate']?.match(/\d+/)?.at(0)),
          capacity: Number(
            data['variant-category:vc-capacity'].match(/\d+/)[0],
          ),
          capacityUnit: data['variant-category:vc-capacity']
            .match(/\D+/)[0]
            .trim(),
          interface: data['txtInterface'] || 'PCIe Gen3 x2 NVMe v1.3',
          connector: data['txtConnector'],
          dimensions: dimensions && {
            height: dimensions[0],
            width: dimensions[1],
            depth: dimensions[2],
          },
          readVelocity:
            Number(data['txtSequentialRead']?.match(/\d+/)[0]) || null,
          writeVelocity:
            Number(data['txtSequentialWrite']?.match(/\d+/)[0]) || null,
          image:
            'https://www.westerndigital.com' +
            (imageInfo[code] && Object.keys(imageInfo[code])[0]),
          url: `${url}#${code}`,
        };
      });
      return storages.toArray<WesternDigitalStorageModel>();
    } catch (error) {
      console.error(url, error);
      return null;
    }
  }
}
