import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { PowersupplyScrap } from '../services/Powersupply.scrap';
import * as fs from 'fs/promises';
import * as cheerio from 'cheerio';
import { ThermaltakePowerSupplyModel } from '../models/thermaltake.model';

const categories = {
  81: 'PSU con software de monitoreo',
  82: 'PSU con rendimiento premium y RGB',
  83: 'PSU populares y fiables',
};

export class ThermaltakePowerSupplyService extends PowersupplyScrap<ThermaltakePowerSupplyModel> {
  public constructor(protected readonly axios: HttpService) {
    super(axios);
  }

  public async getPowersupplys() {
    const powerSupplies: ThermaltakePowerSupplyModel[] = [];
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

          powerSupplies.push(
            ...powerSupplyList.data.map((ps) => ({
              ...ps,
              type: categories[category],
              rgb: ps.name.includes('RGB'),
            })),
          );

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

  protected async readPowersupplies(content: any) {
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
    const price = Number(
      $element
        .find('.price')
        .text()
        .trim()
        .match(/[\d,]+/g)
        .at(0)
        .replace(',', '.'),
    );

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

  protected async getPowersupplyDetail(url: string) {
    const { data } = await lastValueFrom(this.axios.get(url));
    return this.extractPowersupplyDetail(data);
  }

  protected extractPowersupplyDetail(content: string) {
    const $ = cheerio.load(content);

    const dataRow = $('.col.data');
    const dataLabel = $('.col.label')
      .map((_, el) => $(el).text().trim())
      .toArray();

    const $find = (label: string) => {
      const index = dataLabel.indexOf(label);
      if (index === -1) return null;
      return dataRow.eq(index).text().trim();
    };

    const code = $find('P/N').split('\n');
    const formFactor = $find('Factor de Forma') || 'ATX';
    const watts = Number($find('watts')?.match(/\d+/g).at(0));
    const model = $find('Model');
    const maxOutput = Number($find('Max. Output Capacity')?.replace(/\D/g, ''));
    const peakOutput = Number(
      $find('Peak Output Capacity')?.replace(/\D/g, ''),
    );
    const dimmensions = $find('Dimension ( W / H / D )')
      ?.match(/\d+/g)
      .map((d) => Number(d));
    const inputCurrent = Number($find('Input Current')?.match(/\d+/g).at(0));
    const inputFrecuencyRange = $find('Input Frequency Range')
      ?.match(/\d+/g)
      .map((d) => Number(d));
    const inputVoltage = $find('Input Voltage')
      ?.match(/\d+/g)
      .map((d) => Number(d));
    const efficency =
      $find('Efficiency')?.match(/®\w+/g)?.at(0).replace('®', '') || 'Normal';
    const pciPines = Number($find('PCI-E 6+2pin') || $find('Conector PCI-E'));
    const releaseDate = new Date(
      $('.product-attachment').find('li').eq(4).text().trim(),
    );

    const modularityInfo = $('.product.attribute.overview')
      .text()
      .trim()
      .match(/\w+(?=( |-)modular)/gi)
      ?.at(0)
      .toLowerCase();

    const modularity = modularityInfo?.includes('full')
      ? 2
      : modularityInfo?.includes('semi')
      ? 1
      : 0;

    return {
      codes: [model, ...code].filter(Boolean),
      releaseDate,
      dimmensions: dimmensions && {
        width: dimmensions[0],
        height: dimmensions[1],
        depth: dimmensions[2],
      },
      formFactor,
      pciPines,
      power: watts,
      current: inputCurrent,
      voltage: inputVoltage && {
        min: inputVoltage[0],
        max: inputVoltage[1],
      },
      frequency: inputFrecuencyRange && {
        min: inputFrecuencyRange[0],
        max: inputFrecuencyRange[1],
      },
      output: {
        min: maxOutput,
        max: peakOutput,
      },
      efficiency80plus: efficency,
      modularity,
    };
  }
}
