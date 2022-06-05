import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { PowersupplyScrap } from '../services/Powersupply.scrap';
import * as fs from 'fs/promises';
import * as cheerio from 'cheerio';

const categories = {
  81: 'PSU con software de monitoreo',
  82: 'PSU con rendimiento premium y RGB',
  83: 'PSU populares y fiables',
};

export class ThermaltakePowerSupplyService extends PowersupplyScrap<any> {
  public constructor(protected readonly axios: HttpService) {
    super(axios);
  }

  public async getPowersupplys(): Promise<any[]> {
    const powerSupplies = [];
    for (const category in categories) {
      let next = true;
      let page = 1;

      try {
        do {
          const { data } = await lastValueFrom(
            this.axios.get(
              'https://latam.thermaltake.com/products/power-supply.html',
              {
                params: {
                  p: page,
                  ajax: 1,
                  product_list_limit: 30,
                  cat: category,
                },
              },
            ),
          );

          const powerSupplyList = await this.readPowersupplies(data);
          powerSupplyList.data = powerSupplyList.data.map((ps: any) => ({
            ...ps,
            category: categories[category],
            rgb: ps.name.includes('RGB'),
          }));
          powerSupplies.push(...powerSupplyList.data);

          next = powerSupplyList.next;
          page++;
        } while (next);
      } catch (error) {
        console.error(error);
      }
    }

    await fs.writeFile(
      'results/power-supplies/thermaltake.json',
      JSON.stringify(powerSupplies),
    );
    return powerSupplies;
  }

  protected async readPowersupplies(content: any): Promise<any> {
    const powerSuppliesListRaw = content.html.products_list;
    const $ = cheerio.load(powerSuppliesListRaw);

    const powerSuppliesList = await Promise.all(
      $('.product-item-info')
        .map((_, el) => this.extractPowersuppliesInfo({ el, $ }))
        .toArray(),
    );

    const powerSupplies = powerSuppliesList.filter((p) => p !== null);

    return {
      data: powerSupplies,
      next: powerSuppliesList.length === powerSupplies.length,
    };
  }

  protected async extractPowersuppliesInfo({
    el,
    $,
  }: {
    el: cheerio.Element;
    $: cheerio.CheerioAPI;
  }) {
    const $element = $(el);
    const photoURL = $element
      .find('.product-image-photo')
      .attr('data-src')
      .trim();
    const url = $element.find('.product-item-link').attr('href').trim();
    const name = $element.find('.product-item-link').text().trim();
    const price = $element.find('.price').text().trim();

    const powerSupply = {
      photoURL,
      url,
      name,
      price,
    };

    const powerSupplyDetail = await this.getPowersupplyDetail(url);

    if (
      new Date().getFullYear() - powerSupplyDetail.releaseDate.getFullYear() >
      5
    ) {
      return null;
    }

    return { ...powerSupply, ...powerSupplyDetail };
  }

  protected async getPowersupplyDetail(url: string): Promise<any> {
    const { data } = await lastValueFrom(this.axios.get(url));
    return this.extractPowersupplyDetail(data);
  }

  protected extractPowersupplyDetail(content: string) {
    const $ = cheerio.load(content);

    const dataRow = $('.col.data');
    const code = dataRow.eq(0).text().trim();
    const watts = dataRow.eq(1).text().trim();
    const model = dataRow.eq(2).text().trim();
    const maxOutput = dataRow.eq(3).text().trim();
    const peakOutput = dataRow.eq(4).text().trim();
    const color = dataRow.eq(5).text().trim();
    const dimmensions = dataRow.eq(6).text().trim();
    const pfc = dataRow.eq(7).text().trim();
    const powerGoodSignal = dataRow.eq(8).text().trim();
    const holdUpTime = dataRow.eq(9).text().trim();
    const inputCurrent = dataRow.eq(10).text().trim();
    const inputFrecuencyRange = dataRow.eq(11).text().trim();
    const inputVoltage = dataRow.eq(12).text().trim();
    const operatingTemperature = dataRow.eq(13).text().trim();
    const operatingHumidity = dataRow.eq(14).text().trim();
    const storageTemperature = dataRow.eq(15).text().trim();
    const coolingSystem = dataRow.eq(16).text().trim();
    const efficency = dataRow.eq(17).text().trim();
    const mtbf = dataRow.eq(18).text().trim();
    const saffetyApproval = dataRow.eq(19).text().trim();
    const pciPines = dataRow.eq(20).text().trim();
    const protection = dataRow.eq(21).text().trim();
    const releaseDate = new Date(
      $('.product-attachment').find('li').eq(4).text().trim(),
    );

    return {
      code,
      watts,
      model,
      maxOutput,
      peakOutput,
      color,
      dimmensions,
      pfc,
      powerGoodSignal,
      holdUpTime,
      inputCurrent,
      inputFrecuencyRange,
      inputVoltage,
      operatingTemperature,
      operatingHumidity,
      storageTemperature,
      coolingSystem,
      efficency,
      mtbf,
      saffetyApproval,
      pciPines,
      protection,
      releaseDate,
    };
  }
}
