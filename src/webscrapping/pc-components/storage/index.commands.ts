import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Command } from 'nestjs-command';
import { PrismaService } from 'src/databases/questions/prisma.service';
import { WesternDigitalStorageScrapService } from './sources/wd.scrap';

@Injectable()
export class StorageScrapCommand {
  constructor(
    private readonly prisma: PrismaService,
    private readonly wdService: WesternDigitalStorageScrapService,
  ) {}

  @Command({ command: 'scrap:storage' })
  async scrap() {
    console.log('Scraping Storage...');
    console.log('Scraping Western Digital...');
    const wdStorages = await this.wdService.getStorages();
    console.log('Scraping Storage... done');

    console.log('Formatting data...');
    console.log('Formatting Western Digital...');
    const wdFormattedStorages =
      wdStorages.map<Prisma.ComponentCreateWithoutTypeInput>((wd) => ({
        brand: 'Western Digital',
        frabricId: wd.code,
        model: wd.model,
        image: wd.image,
        storage: {
          create: {
            capacity: wd.capacity,
            capacityUnit: wd.capacityUnit,
            format: wd.formFactor,
            haveSink: wd.haveSink,
            interface: wd.interface,
            type: wd.type,
            speedRead: wd.readVelocity,
            speedWrite: wd.writeVelocity,
            revolutions: wd.diskSpeed,
          },
        },
      }));

    console.log('Formatting Storage... done');

    console.log('Saving data...');
    console.log('Saving Western Digital...');
    await this.prisma.componentType.upsert({
      where: { slug: 'storage' },
      update: {},
      create: {
        id: 6,
        name: 'Almacenamiento',
        description: 'Almacenamiento',
        slug: 'storage',
        components: {
          create: wdFormattedStorages,
        },
      },
    });
    console.log('Saving Western Digital... done');

    console.log('Scraping Storage... done');
  }
}
