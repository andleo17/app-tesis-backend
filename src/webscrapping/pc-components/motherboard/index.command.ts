import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Command } from 'nestjs-command';
import { PrismaService } from 'src/databases/questions/prisma.service';
import { GigabyteMotherboardsService } from './sources/gigabyte.scrap';

@Injectable()
export class MotherboardScrapCommand {
  constructor(
    private readonly prisma: PrismaService,
    private readonly gigabyteService: GigabyteMotherboardsService,
  ) {}

  @Command({
    command: 'scrap:motherboard',
  })
  async scrap() {
    console.log('Scraping Motherboard...');
    console.log('Scraping Gigabyte...');
    const gigabyteMotherboards = await this.gigabyteService.getMotherboards();
    console.log('Scraping Motherboard... done');

    console.log('Formatting data...');
    console.log('Formatting Gigabyte...');
    const gigabyteFormattedMotherboards =
      gigabyteMotherboards.map<Prisma.ComponentCreateWithoutTypeInput>(
        (gigabyte) => ({
          brand: 'Gigabyte',
          frabricId: gigabyte.id.toString(),
          model: gigabyte.name,
          image: gigabyte.image,
          motherboard: {
            create: {
              chipset: gigabyte.processor.chipset,
              formFactor: gigabyte.formFactor,
              hasWireless: gigabyte.wireless !== null,
              memoryDualChannel: gigabyte.memory.hasDualChannel,
              memoryFormat: gigabyte.memory.format,
              memoryMaxCapacity: gigabyte.memory.maxSupport,
              memorySlots: gigabyte.memory.slots,
              memoryType: gigabyte.memory.type,
              memoryXMP: gigabyte.memory.hasXMP,
              networkInterfaceMaxSpeed:
                gigabyte.lan[0].velocity?.at(0) || '1 Gbit',
              slotsPCIe: gigabyte.slots.reduce(
                (acc, slot) => acc + slot.quantity,
                0,
              ),
              portsM2PCIe: gigabyte.storage[2].slots || 0,
              portsM2SATA: gigabyte.storage[1].slots || 0,
              portsSATA: gigabyte.storage[0].slots || 0,
              portsUSB: gigabyte.usb.reduce((acc, usb) => acc + usb.slots, 0),
              powerSupply: '',
              socket: gigabyte.processor.socket,
              supportMultiGraphics: gigabyte.multigraphics !== null,
              memoryFrecuencies: gigabyte.memory.frecuencies,
            },
          },
        }),
      );

    console.log('Formatting Gigabyte... done');
    console.log('Saving Motherboards...');
    await this.prisma.componentType.upsert({
      where: { slug: 'motherboard' },
      update: {},
      create: {
        id: 3,
        name: 'Place Madre',
        description: 'Place Madre',
        slug: 'motherboard',
        components: {
          create: gigabyteFormattedMotherboards,
        },
      },
    });
    console.log('Saving Motherboard... done');
  }
}
