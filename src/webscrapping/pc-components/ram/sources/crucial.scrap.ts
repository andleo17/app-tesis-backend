import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import * as cheerio from 'cheerio';
import * as fs from 'fs/promises';
import { CrucialRamModel } from '../models/crucial.model';

const types = ['ddr4', 'ddr5'];

@Injectable()
export class CrucialRamScrapService {
  constructor(private readonly axios: HttpService) {}

  public async getRams() {
    const rams: CrucialRamModel[] = [];
    for (const type of types) {
      const { data } = await lastValueFrom(
        this.axios.get(`https://www.crucial.mx/catalog/memory/${type}`),
      );
      const ramList = await this.readRams(data);
      rams.push(...ramList);
    }

    await fs.writeFile('results/rams/crucial.json', JSON.stringify(rams));
    return rams;
  }

  private async readRams(content: string) {
    const $ = cheerio.load(content);
    const ramListRaw = $('script[type="text/javascript"]')
      .eq(3)
      .html()
      .trim()
      .match(/'.+'/g)
      .at(0)
      .replace(/\\x22/g, '"')
      .replace(/\\u002/g, '-')
      .replace(/\\/g, '')
      .replace(/'/g, '');
    let ramList: any[] = JSON.parse(ramListRaw);
    ramList = ramList.filter((r: any) => !r.title.includes('SODIMM'));

    const rams = ramList.map<CrucialRamModel>((ram: any) => ({
      name: ram['title'],
      code: ram['sku'],
      brand: ram['brand'],
      series: ram['series'],
      url: `https://www.crucial.mx/memory/${ram['technology']}/${ram['sku']}`,
      imageUrl: ram['image-Dpath']
        ?.replace(/D/g, '')
        .replace('small', 'medium'),
      price: Number(ram['price']),
      type: ram['technology'],
      moduleType: ram['module-Dtype'],
      capacity: Number(
        ram['total-Dcapacity']?.match(/\d+/g)?.[0] ||
          ram['title'].match(/\d+/g)?.[0],
      ),
      speed: Number(
        ram['speed'].replace(ram['technology'], '').replace(/\D/g, ''),
      ),
      voltage: Number(ram['voltage'].replace('V', '')),
      kitQuantity: ram['kit-Dqty'],
      casLatency: Number(
        ram['specs'].split('•').at(1).replace(/\D/g, '').slice(0, 2),
      ),
      rgb: ram['title'].includes('RGB'),
    }));

    return rams;
  }
}
