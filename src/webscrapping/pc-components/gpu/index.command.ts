import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { PrismaService } from 'src/databases/questions/prisma.service';
import { GigabyteGraphicsService } from './sources/gigabyte.scrap';

@Injectable()
export class GpuScrapCommand {
  constructor(
    private readonly prisma: PrismaService,
    private readonly gigabyteService: GigabyteGraphicsService,
  ) {}

  @Command({
    command: 'scrap:gpu',
  })
  async scrap() {
    console.log('Scraping GPU...');
    console.log('Scraping Gigabyte...');
    const gigabyteGPUs = await this.gigabyteService.getGraphicCards();
    console.log('Scraping GPU... done');

    console.log('Formatting data...');
    console.log('Formatting Gigabyte...');
    const gigabyteFormattedGPUs = gigabyteGPUs.map((gigabyte) => ({
      brand: 'Gigabyte',
      frabricId: gigabyte.model + '-' + gigabyte.id,
      model: gigabyte.name,
      image: gigabyte.image,
      gpu: {
        create: {
          connectorDisplayPort: gigabyte.outputs[0]['DisplayPort 1.4a'] || 1,
          connectorHDMI: gigabyte.outputs[1]['HDMI 2.1'] || 1,
          cores: gigabyte.cudaCores,
          family: `${gigabyte.vendor} ${gigabyte.chipset}`,
          frecuency: gigabyte.baseFrecuency,
          interface: gigabyte.cardBus,
          memory: gigabyte.vram,
          maxResolution: gigabyte.maxResolution,
          pines: gigabyte.pines,
          power: gigabyte.tdp,
        },
      },
    }));

    console.log('Formatting Gigabyte... done');
    console.log('Saving GPUs...');
    await this.prisma.componentType.upsert({
      where: { slug: 'gpu' },
      update: {},
      create: {
        id: 2,
        name: 'Tarjeta de Video',
        description: 'Tarjeta de Video',
        slug: 'gpu',
        components: {
          create: gigabyteFormattedGPUs,
        },
      },
    });
    console.log('Saving GPU... done');
  }
}
