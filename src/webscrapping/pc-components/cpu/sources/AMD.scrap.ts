import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import * as cheerio from 'cheerio';
import { AMDProcessorModel } from '../models/AMDProcessor.model';
import * as fs from 'fs/promises';

const amdProcessorFamily = [
  23341, // Ryzen
  23331, // Athlon
  23346, // Threadripper
];

@Injectable()
export class AMDProcessorService {
  constructor(private readonly axios: HttpService) {}

  async getAMDProcessors(): Promise<AMDProcessorModel[]> {
    const processors = [];
    for (const processorFamily of amdProcessorFamily) {
      const { data } = await lastValueFrom(
        this.axios.get<string>(
          'https://www.amd.com/en/products/specifications/processors',
          {
            params: {
              's_family[]': processorFamily,
            },
          },
        ),
      );

      const processorList = await this.readProcessorsList(data);

      processors.push(...processorList);
    }

    await fs.writeFile('results/cpus/amd.json', JSON.stringify(processors));
    return processors;
  }

  private async readProcessorsList(html: string): Promise<AMDProcessorModel[]> {
    const $ = cheerio.load(html);

    const processorRawList = $('tbody tr')
      .map((_, el) => this.extractProcessorInfo(el, $))
      .toArray();

    const processorList = processorRawList.filter(Boolean);

    return processorList;
  }

  private extractProcessorInfo(
    element: cheerio.Element,
    $: cheerio.CheerioAPI,
  ): AMDProcessorModel {
    const $el = $(element);

    const $find = (field: string) =>
      $el.find(`td[headers="view-${field}-table-column"]`).text().trim();

    const launchDateAux = $find('field-launch-date');
    const launchDate = this.formatDate(launchDateAux);

    if (launchDate)
      if (new Date().getFullYear() - launchDate.getFullYear() > 5) return null;
    const platform = $find('platform');

    if (platform !== 'Desktop' && platform !== 'Boxed Processor') return null;
    const $processorName = $el.find('td[headers="view-name-table-column"]');
    const name = $processorName.text().trim();
    const id = Number(
      $processorName.attr('class').split(' ')[1].replace('entity-', ''),
    );
    const url = `https://www.amd.com/en/product/${id}`;
    const series = $find('product-type').replace('Processors', '').trim();
    const seriesDetail = $find('product-type-1');
    const model = name.match(/(\d{3,})\w*/g).at(0);
    const generation = Number(model.match(/\d+(?=\d{3,})/g)?.at(0));
    const specificator = model.match(/(?!\d).*/g).at(0);
    const codes = [
      ...$find('field-opn-tray')
        .replace(/(\w+:\t?)|\//g, '')
        .split(' '),
      $find('field-opn-pib'),
      $find('field-opn-mpk'),
    ]
      .filter(Boolean)
      .filter((c) => c !== 'n/a');
    const cores = Number($find('field-cpu-core-count'));
    const threads = Number($find('field-thread-count'));
    const gpuCores = Number($find('field-gpu-core-count'));
    const baseFrecuency =
      Number($find('field-cpu-clock-speed').replace(/[^0-9]/g, '')) * 100;
    const maxFrecuency =
      Number($find('field-max-cpu-clock-speed').replace(/[^0-9]/g, '')) * 100;
    const l1Cache = Number(
      $find('field-total-l1-cache').replace(/[^0-9]/g, ''),
    );
    const l2Cache = Number(
      $find('field-total-l2-cache').replace(/[^0-9]/g, ''),
    );
    const l3Cache = Number(
      $find('field-total-l3-cache').replace(/[^0-9]/g, ''),
    );
    const isUnlocked = $find('field-unlocked') === 'Yes';
    const lithography = Number($find('field-cmos').replace(/[^0-9]/g, ''));
    const socket = $find('field-socket');
    const portType = $find('product-type-4');
    const tdp = Number($find('field-default-tdp').replace(/[^0-9]/g, ''));
    const maxTemperature = Number(
      $find('field-max-temps').replace(/[^0-9]/g, ''),
    );
    const maxMemory = Number(
      $find('field-max-memory-speed').replace(/[^0-9]/g, ''),
    );
    const memoryType = $find('product-type-6');
    const memoryChannels = Number(
      $find('field-memory-channels').replace(/[^0-9]/g, ''),
    );
    const graphicsFrecuency = Number(
      $find('field-gpu-clock-speed').replace(/[^0-9]/g, ''),
    );
    const graphicsName = $find('product-type-2');

    return {
      id,
      name,
      url,
      model,
      generation,
      specificator,
      series,
      seriesDetail,
      platform,
      codes,
      launchDate,
      cores,
      threads,
      gpuCores,
      baseFrecuency,
      maxFrecuency,
      l1Cache,
      l2Cache,
      l3Cache,
      isUnlocked,
      lithography,
      socket,
      portType,
      tdp,
      maxTemperature,
      maxMemory,
      memoryType,
      memoryChannels,
      graphicsFrecuency,
      graphicsName,
    };
  }

  private formatDate(dateStr: string): Date {
    if (!dateStr) return null;

    let dateArray = dateStr.split('/');

    if (dateArray.length === 1) {
      const quarterFormat = dateStr.split(' ');
      if (quarterFormat[0].match(/Q\d/g)) {
        const quarter = Number(quarterFormat[0][1]);
        dateArray = [String(quarter * 4), quarterFormat[1]];
      }
    }

    if (dateArray.length === 2) dateArray.splice(1, 0, '01');

    const date = dateArray.join('-');
    return new Date(date);
  }
}
