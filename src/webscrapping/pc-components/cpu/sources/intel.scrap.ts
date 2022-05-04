import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import * as cheerio from 'cheerio';
import { IntelModel } from '../models/intel.model';

const intelProcessorFamily = [
  43521, // Celeron
  122139, // Core
  29862, // Pentium
];

@Injectable()
export class IntelService {
  constructor(private readonly axios: HttpService) {}

  async getIntelProcessors(): Promise<IntelModel[]> {
    const processors = [];
    for (const processorFamily of intelProcessorFamily) {
      let next = true;
      let page = 1;
      do {
        const { data } = await lastValueFrom(
          this.axios.get<string>(
            'https://ark.intel.com/libs/apps/intel/support/ark/advancedFilterSearch',
            {
              params: {
                productType: 873,
                '1_Filter-Family': processorFamily,
                '2_MarketSegment': 'Desktop',
                '2_StatusCodeText': 4,
                forwardPath: '/content/www/es/es/ark/search/featurefilter.html',
                pageNo: page,
              },
            },
          ),
        );

        const processorList = await this.readProcessorsList(data);

        processors.push(...processorList.data);

        next = processorList.next;
        page++;
      } while (next);
    }
    return processors;
  }

  private async readProcessorsList(
    html: string,
  ): Promise<{ data: IntelModel[]; next: boolean }> {
    const $ = cheerio.load(html);

    const processorRawList = await Promise.all(
      $('.seg-desktop')
        .map((_, el) => this.extractProcessorInfo(el, $))
        .toArray(),
    );

    const processorList = processorRawList.filter(
      (processor) => processor !== null,
    );

    return {
      data: processorList,
      next: processorRawList.length === processorList.length,
    };
  }

  private async extractProcessorInfo(
    element: cheerio.Element,
    $: cheerio.CheerioAPI,
  ): Promise<IntelModel | null> {
    const $el = $(element);
    const id = $el.attr('data-product-id');

    const $processorInfo = $el.find('td');

    const processorURL =
      'https://ark.intel.com' + $($processorInfo[0].firstChild).attr('href');
    const processorDate = new Date($($processorInfo[2]).attr('data-value'));

    if (new Date().getFullYear() - processorDate.getFullYear() > 5) {
      return null;
    }

    const processorDetails = await this.getProcessorDetail(processorURL);

    return {
      id,
      url: processorURL,
      date: processorDate,
      ...processorDetails,
    };
  }

  private async getProcessorDetail(url: string) {
    const { data } = await lastValueFrom(this.axios.get<string>(url));
    return this.extractProcessorDetail(data);
  }

  private extractProcessorDetail(
    html: string,
  ): Omit<IntelModel, 'id' | 'url' | 'date'> {
    const $ = cheerio.load(html);
    const image = $('.badge-loaded').children('img').attr('src').trim();
    const family = $('span[data-key="ProductGroup"]')
      .text()
      .match(/(Intel®).+/g)[0]
      .replace('Intel®', '')
      .replace(/(de).+/g, '')
      .trim();
    const platform = $('span[data-key="MarketSegment"]').text().trim();
    const model = $('span[data-key="ProcessorNumber"]').text().trim();
    const generationAux = model.replace(/i[0-9]|[^0-9]/g, '').trim();
    const generation = Number(
      generationAux.length > 4 ? generationAux.slice(0, 2) : generationAux[0],
    );
    const lithography = Number(
      $('span[data-key="Lithography"]')
        .text()
        .replace(/[^0-9]/g, '')
        .trim(),
    );
    const cores = Number($('span[data-key="CoreCount"]').text().trim());
    const threads = Number($('span[data-key="ThreadCount"]').text().trim());
    const baseFrecuency =
      Number(
        (
          $('span[data-key="ClockSpeed"]').text().trim() ||
          $('span[data-key="PCoreBaseFreq"]').text().trim()
        ).replace(/[^0-9]/g, ''),
      ) * 10;
    const maxFrecuency =
      Number(
        $('span[data-key="ClockSpeedMax"]')
          .text()
          .trim()
          .replace(/[^0-9]/g, ''),
      ) * 10 || baseFrecuency;

    const cache = Number(
      $('span[data-key="Cache"]')
        .text()
        .replace(/[^0-9]/g, '')
        .trim(),
    );
    const tdp = Number(
      (
        $('span[data-key="MaxTDP"]').text().trim() ||
        $('span[data-key="ProcessorBasePower"]').text().trim()
      ).replace(/[^0-9]/g, ''),
    );
    const maxMemory = Number(
      (
        $('span[data-key="MaxMemory"]').text().trim() ||
        $('span[data-key="MaxMem"]').text().trim()
      ).replace(/[^0-9]/g, ''),
    );
    const memoryTypesRaw = $('span[data-key="MemoryTypes"]')
      .text()
      .matchAll(/(DDR\d-?\w? ?-?\d+)/g);
    const memoryTypes = Array.from(memoryTypesRaw).map(([type]) =>
      type.replace(' ', '-'),
    );
    const maxChannelMemory = Number(
      $('span[data-key="NumMemoryChannels"]')
        .text()
        .replace(/[^0-9]/g, '')
        .trim(),
    );

    const graphicsName = $('span[data-key="ProcessorGraphicsModelId"]')
      .text()
      .trim();

    const graphicsBaseFrecuency =
      Number(
        $('span[data-key="GraphicsFreq"]')
          .text()
          .replace(/[^0-9]/g, '')
          .trim(),
      ) * 10;

    const graphicsMaxFrecuency =
      Number(
        $('span[data-key="GraphicsMaxFreq"]')
          .text()
          .replace(/[^0-9]/g, '')
          .trim(),
      ) * 10;
    const graphicsMaxMemory =
      Number(
        $('span[data-key="GraphicsMaxMem"]')
          .text()
          .replace(/[^0-9]/g, '')
          .trim(),
      ) || null;
    const graphicsMaxResolutionHDMI = $(
      'span[data-key="GraphicsMaxResolutionHDMI"]',
    )
      .text()
      .trim();
    const graphicsMaxResolutionDP = $(
      'span[data-key="GraphicsMaxResolutionDP"]',
    )
      .text()
      .trim();
    const socket = $('span[data-key="SocketsSupported"]').text().trim();
    const maxTemperature = Number(
      $('span[data-key="ThermalJunctionRateCode"]')
        .text()
        .replace(/[^0-9]/g, '')
        .trim(),
    );

    return {
      image,
      family,
      platform,
      model,
      generation,
      lithography,
      cores,
      threads,
      maxFrecuency,
      baseFrecuency,
      cache,
      tdp,
      maxMemory,
      memoryTypes,
      maxChannelMemory,
      graphics: graphicsName
        ? {
            name: graphicsName,
            baseFrecuency: graphicsBaseFrecuency,
            maxFrecuency: graphicsMaxFrecuency,
            maxMemory: graphicsMaxMemory,
            maxResolutionHDMI: graphicsMaxResolutionHDMI,
            maxResolutionDP: graphicsMaxResolutionDP,
          }
        : null,
      socket,
      maxTemperature,
    };
  }
}
