import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import { lastValueFrom } from 'rxjs';
import * as fs from 'fs/promises';

@Injectable()
export class AsrockService {
  constructor(private readonly axios: HttpService) {}

  async getMotherboards(): Promise<any> {
    try {
      const { data } = await lastValueFrom(
        this.axios.get('https://www.asrock.com/mb/certification.asp?cat=10'),
      );

      const motherboardsData = await Promise.all(
        this.readMotherboardList(data),
      );

      const motherboards = motherboardsData.filter((m) => m.chipset);

      await fs.writeFile(
        'results/motherboards/asrock.json',
        JSON.stringify(motherboards),
      );

      return motherboards;
    } catch (error) {
      console.error(error);
    }
  }

  private readMotherboardList(html: string) {
    const $ = cheerio.load(html);
    return $('table tr')
      .map((_, el) => this.extractMotherboardInfo(el, $))
      .toArray();
  }

  private async extractMotherboardInfo(
    element: cheerio.Element,
    $: cheerio.CheerioAPI,
  ) {
    const tableRow = $(element).find('td');
    const url = tableRow.eq(2).find('a').attr('href');
    const motherboardData = {
      socket: tableRow.eq(0).text(),
      chipset: tableRow.eq(1).text(),
      model: tableRow.eq(2).text(),
      url: url && 'https://www.asrock.com' + url,
      detail: undefined,
    };

    if (motherboardData.url) {
      motherboardData.url = motherboardData.url.replace(/ /g, '%20');
      motherboardData.detail = await this.getMotherboardDetail(
        motherboardData.url,
      );
    }
    return motherboardData;
  }

  private async getMotherboardDetail(url: string): Promise<any> {
    try {
      const { data } = await lastValueFrom(this.axios.get(url));
      return this.extractMotherboardDetailInfo(data);
    } catch (error) {
      console.error(error);
    }
  }

  private async extractMotherboardDetailInfo(html: string) {
    const $ = cheerio.load(html);
    const $motherboardDetailData = $('.SpecData');
    const haveGamingArmor = $('.SpecItem')
      .eq(0)
      .text()
      .includes('Gaming Armor');
    const haveWireless = $('.SpecItem')
      .map((_, el) => $(el).text())
      .toArray()
      .includes('Wireless LAN');

    let i = haveGamingArmor ? 4 : 3;
    const memoryInfo = $motherboardDetailData
      .eq(i++)
      .text()
      .split('-')
      .map((p) => p.trim());

    const extractSlots = (data: string) => {
      const slots = {
        PCIe3: data.match(/PCI Express 3.0/g).length,
        PCIe2: data.match(/PCI Express 2.0/g).length,
      };
      return slots;
    };

    const extractStorage = (data: string[]) => {
      const storage = {
        SATA3: data[1],
        SATAe: data[2],
        m2: data.slice(3).join(' '),
      };
      return storage;
    };

    const motherboardDetail = {
      memory: {
        channels: memoryInfo[1],
        slots: Number(memoryInfo[2][0]),
        type: memoryInfo[2].split(' ').slice(2, 3).join(' '),
        supportedFrequencies: memoryInfo[3]
          .replace(/ \/ /g, '/')
          .split(' ')
          .at(2)
          ?.split('/'),
        maxCapacity: memoryInfo.join(' ').match(/\d+GB/g)?.at(0),
        extra: memoryInfo,
      },
      lan: $motherboardDetailData
        .eq((i += 3))
        .text()
        .split('-')
        .map((p) => p.trim())
        .at(1),
      wireless:
        haveWireless &&
        $motherboardDetailData
          .eq(++i)
          .text()
          .split('-')
          .map((p) => p.trim())
          .at(1),
      slots: extractSlots($motherboardDetailData.eq(++i).text()),
      storage: extractStorage(
        $motherboardDetailData
          .eq(++i)
          .text()
          .split('-')
          .map((p) => p.trim()),
      ),
      connector: $motherboardDetailData
        .eq(++i)
        .text()
        .split('-')
        .map((p) => p.trim()),
      rearPanel: $motherboardDetailData
        .eq(++i)
        .text()
        .split('-')
        .map((p) => p.trim()),
      software: $motherboardDetailData
        .eq(++i)
        .text()
        .split('-')
        .map((p) => p.trim()),
      supportCD: $motherboardDetailData
        .eq(++i)
        .text()
        .split('-')
        .map((p) => p.trim()),
      Accessories: $motherboardDetailData
        .eq(++i)
        .text()
        .split('-')
        .map((p) => p.trim()),
      monitor: $motherboardDetailData
        .eq(++i)
        .text()
        .split('-')
        .map((p) => p.trim()),
      formFactor: $motherboardDetailData
        .eq(++i)
        .text()
        .split('-')
        .map((p) => p.trim()),
    };
    return motherboardDetail;
  }
}
