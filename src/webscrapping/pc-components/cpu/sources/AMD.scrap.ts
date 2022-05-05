import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import * as cheerio from 'cheerio';
import { AMDProcessorModel } from '../models/AMDProcessor.model';

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
    const $processorInfo = $el.find('td');
    const launchDate = new Date($($processorInfo[8]).text());

    if (new Date().getFullYear() - launchDate.getFullYear() > 5) return null;
    const platform = $($processorInfo[4]).text();

    if (platform !== 'Desktop' && platform !== 'Boxed Processor') return null;

    const id = Number(
      $($processorInfo[1]).attr('class').split(' ')[1].replace('entity-', ''),
    );
    const name = $($processorInfo[1]).text();
    const series = $($processorInfo[2]).text().replace('Processors', '').trim();
    const seriesDetail = $($processorInfo[3]).text();
    const model = name.match(/(\d{3,}\w*)/g)[0];
    const generation =
      model.replace(/[^0-9]/g, '').length > 4
        ? Number(model.slice(0, 2))
        : Number(model[0]);
    const specificatorAux = model.match(/[A-Z]+/g);
    const specificator = specificatorAux ? specificatorAux[0] : null;
    const codes = [
      ...$($processorInfo[5])
        .text()
        .replace(/(\w+:\t?)/g, '')
        .split(' '),
      $($processorInfo[6]).text(),
      $($processorInfo[7]).text(),
    ].filter(Boolean);
    const cores = Number($($processorInfo[9]).text());
    const threads = Number($($processorInfo[10]).text());
    const gpuCores = Number($($processorInfo[11]).text());
    const baseFrecuency =
      Number(
        $($processorInfo[12])
          .text()
          .replace(/[^0-9]/g, ''),
      ) * 100;
    const maxFrecuency =
      Number(
        $($processorInfo[13])
          .text()
          .replace(/[^0-9]/g, ''),
      ) * 100;
    const l1Cache = Number($($processorInfo[14]).text());
    const l2Cache = Number(
      $($processorInfo[15])
        .text()
        .replace(/[^0-9]/g, ''),
    );
    const l3Cache = Number(
      $($processorInfo[16])
        .text()
        .replace(/[^0-9]/g, ''),
    );
    const isUnlocked = $($processorInfo[17]).text() === 'Yes';
    const lithography = Number(
      $($processorInfo[18])
        .text()
        .replace(/[^0-9]/g, ''),
    );
    const socket = $($processorInfo[19]).text();
    const socketCount = $($processorInfo[20]).text();
    const portType = $($processorInfo[21]).text();
    const thermalSolution = $($processorInfo[22]).text();
    const thermalSolution2 = $($processorInfo[23]).text();
    const tdp = Number(
      $($processorInfo[24])
        .text()
        .replace(/[^0-9]/g, ''),
    );
    const maxTdp = $($processorInfo[25]).text();
    const maxTemperature = Number(
      $($processorInfo[26])
        .text()
        .replace(/[^0-9]/g, ''),
    );
    const supportedOS = $($processorInfo[27]).text();
    const maxMemory = Number(
      $($processorInfo[28])
        .text()
        .replace(/[^0-9]/g, ''),
    );
    const memoryType = $($processorInfo[29]).text();
    const memoryChannels = Number(
      $($processorInfo[30])
        .text()
        .replace(/[^0-9]/g, ''),
    );
    const graphicsFrecuency =
      Number(
        $($processorInfo[31])
          .text()
          .replace(/[^0-9]/g, ''),
      ) || null;
    const graphicsName = $($processorInfo[32]).text();

    return {
      id,
      name,
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
      socketCount,
      portType,
      thermalSolution,
      thermalSolution2,
      tdp,
      maxTdp,
      maxTemperature,
      supportedOS,
      maxMemory,
      memoryType,
      memoryChannels,
      graphicsFrecuency,
      graphicsName,
    };
  }
}
