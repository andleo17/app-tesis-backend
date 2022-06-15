import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { PrismaService } from 'src/databases/questions/prisma.service';
import { AMDProcessorService } from './sources/AMD.scrap';
import { IntelService } from './sources/intel.scrap';

@Injectable()
export class CPUScrapCommand {
  constructor(
    private readonly prisma: PrismaService,
    private readonly amdService: AMDProcessorService,
    private readonly intelService: IntelService,
  ) {}

  @Command({
    command: 'scrap:cpu',
  })
  async scrap() {
    console.log('Scraping CPU...');
    console.log('Scraping AMD...');
    const amdProcessors = await this.amdService.getAMDProcessors();
    console.log('Scraping Intel...');
    const intelProcessors = await this.intelService.getIntelProcessors();
    console.log('Scraping CPU... done');

    console.log('Formatting data...');
    console.log('Formatting AMD...');
    const amdFormattedProcessors = amdProcessors.map((amd) => ({
      brand: 'AMD',
      frabricId: amd.fabricatorId + '-' + amd.id,
      model: amd.model,
      image: null,
      cpu: {
        create: {
          baseFrecuency: amd.baseFrecuency,
          cacheL3: amd.l3Cache,
          cores: amd.cores,
          family: amd.family || '',
          haveIntegratedGraphics: amd.gpuCores > 0,
          lithography: amd.lithography + 'nm',
          maxMemory: amd.maxMemory,
          maxTemperature: amd.maxTemperature,
          platform: amd.platform,
          socket: amd.socket,
          specifier: amd.specificator || '',
          tdp: amd.tdp,
          threads: amd.threads,
          turboFrecuency: amd.maxFrecuency,
          admitedMemory: [amd.memoryType],
          cacheL2: amd.l2Cache,
          generation: amd.generation,
          graphicBaseFrecuency: amd.graphicsFrecuency,
          graphicMaxFrecuency: amd.graphicsFrecuency,
          launchDate: amd.launchDate,
        },
      },
    }));

    console.log('Formatting Intel...');
    const intelFormattedProcessors = intelProcessors.map((intel) => ({
      brand: 'Intel',
      frabricId: intel.id.toString(),
      model: intel.model,
      image: intel.image,
      cpu: {
        create: {
          baseFrecuency: intel.baseFrecuency,
          cacheL3: intel.cache,
          cores: intel.cores,
          family: intel.family || '',
          haveIntegratedGraphics: intel.graphics !== null,
          lithography: intel.lithography + 'nm',
          maxMemory: intel.maxMemory,
          maxTemperature: intel.maxTemperature,
          platform: intel.platform,
          socket: intel.socket,
          specifier: intel.specificator || '',
          tdp: intel.tdp,
          threads: intel.threads,
          turboFrecuency: intel.maxFrecuency,
          admitedMemory: intel.memoryTypes,
          cacheL2: null,
          generation: intel.generation,
          graphicBaseFrecuency: intel.graphics?.baseFrecuency,
          graphicMaxFrecuency: intel.graphics?.maxFrecuency,
          launchDate: intel.launchDate,
        },
      },
    }));

    console.log('Saving Processors...');
    await this.prisma.componentType.upsert({
      where: { slug: 'processor' },
      update: {},
      create: {
        id: 1,
        name: 'Procesador',
        description: 'Procesador',
        slug: 'processor',
        components: {
          create: amdFormattedProcessors.concat(intelFormattedProcessors),
        },
      },
    });
    console.log('Saving Processors... done');
  }
}
