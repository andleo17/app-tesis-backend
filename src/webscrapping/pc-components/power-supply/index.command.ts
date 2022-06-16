import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Command } from 'nestjs-command';
import { PrismaService } from 'src/databases/questions/prisma.service';
import { ThermaltakePowerSupplyService } from './sources/thermaltake.scrap';

@Injectable()
export class PowerSupplyScrapCommand {
  constructor(
    private readonly prisma: PrismaService,
    private readonly thermaltakeService: ThermaltakePowerSupplyService,
  ) {}

  @Command({
    command: 'scrap:power-supply',
  })
  async scrap() {
    console.log('Scraping Power Supply...');
    console.log('Scraping Thermaltake...');
    const thermaltakePowerSupplies =
      await this.thermaltakeService.getPowersupplys();
    console.log('Scraping Power Supply... done');

    console.log('Formatting data...');
    console.log('Formatting Thermaltake...');
    const thermaltakeFormattedPowerSupplies =
      thermaltakePowerSupplies.map<Prisma.ComponentCreateWithoutTypeInput>(
        (thermaltake) => ({
          brand: 'Thermaltake',
          frabricId: thermaltake.codes.at(-1),
          model: thermaltake.name,
          image: thermaltake.photoURL,
          suggestedPrice: thermaltake.price,
          rgb: thermaltake.rgb,
          powerSupply: {
            create: {
              efficiency: thermaltake.efficiency80plus,
              formFactor: thermaltake.formFactor,
              frequency: thermaltake.frequency?.max || 60,
              modularity: thermaltake.modularity,
              power: thermaltake.power,
            },
          },
        }),
      );
    console.log('Formatting Power Supply... done');

    console.log('Saving data...');
    console.log('Saving Thermaltake...');
    await this.prisma.componentType.upsert({
      where: { slug: 'power-supply' },
      update: {},
      create: {
        id: 4,
        name: 'Fuente de poder',
        description: 'Fuente de poder',
        slug: 'power-supply',
        components: {
          create: thermaltakeFormattedPowerSupplies,
        },
      },
    });
    console.log('Saving Power Supply... done');
  }
}
