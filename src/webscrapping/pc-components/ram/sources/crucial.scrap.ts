import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import * as cheerio from 'cheerio';
import * as fs from 'fs/promises';

const types = ['ddr4', 'ddr5'];

@Injectable()
export class CrucialRamScrapService {
  constructor(private readonly axios: HttpService) {}

  public async getRams(): Promise<any[]> {
    const rams = [];
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

  private async readRams(content: any): Promise<any> {
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
    let ramList = JSON.parse(ramListRaw);
    ramList = ramList.filter((r: any) => !r.title.includes('SODIMM'));
    return ramList;
  }
}
