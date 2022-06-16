import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Command } from 'nestjs-command';
import { PrismaService } from 'src/databases/questions/prisma.service';
import { CrucialRamScrapService } from './sources/crucial.scrap';

@Injectable()
export class RamScrapCommand {
  constructor(
    private readonly prisma: PrismaService,
    private readonly crucialService: CrucialRamScrapService,
  ) {}

  @Command({
    command: 'scrap:ram',
  })
  async scrap() {
    console.log('Scraping Ram...');
    console.log('Scraping Crucial...');
    const crucialRam = await this.crucialService.getRams();
    console.log('Scraping Ram... done');

    console.log('Formatting data...');
    console.log('Formatting Crucial...');
    const crucialFormattedRam =
      crucialRam.map<Prisma.ComponentCreateWithoutTypeInput>((crucial) => ({
        brand: 'Crucial',
        frabricId: crucial.code,
        model: crucial.name,
        image: crucial.imageUrl,
        suggestedPrice: crucial.price,
        rgb: crucial.rgb,
        ram: {
          create: {
            capacity: crucial.capacity,
            frequency: crucial.speed,
            voltage: crucial.voltage,
            format: crucial.moduleType,
            casLatency: crucial.casLatency,
            type: crucial.type,
            series: crucial.series,
          },
        },
      }));

    console.log('Formatting Ram... done');

    console.log('Saving data...');
    console.log('Saving Crucial...');
    await this.prisma.componentType.upsert({
      where: { slug: 'ram' },
      update: {},
      create: {
        id: 5,
        name: 'Memoria',
        description: 'Memoria',
        slug: 'ram',
        components: {
          create: crucialFormattedRam,
        },
      },
    });
    console.log('Saving Ram... done');
  }
}
