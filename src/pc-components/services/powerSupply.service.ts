import { Injectable } from '@nestjs/common';
import { PowerSupply, Prisma } from '@prisma/client';
import { PrismaService } from 'src/databases/questions/prisma.service';

@Injectable()
export class PowerSupplyService {
  constructor(private readonly prisma: PrismaService) {}

  async getPowerSupply(
    where: Prisma.PowerSupplyWhereUniqueInput,
  ): Promise<PowerSupply> {
    return this.prisma.powerSupply.findUnique({
      where,
      include: { component: true },
    });
  }

  async getPowerSupplies(
    where?: Prisma.PowerSupplyWhereInput,
  ): Promise<PowerSupply[]> {
    return this.prisma.powerSupply.findMany({ where });
  }

  async createPowerSupply(
    data: Prisma.PowerSupplyCreateInput,
  ): Promise<PowerSupply> {
    return this.prisma.powerSupply.create({ data });
  }

  async updatePowerSupply(
    where: Prisma.PowerSupplyWhereUniqueInput,
    data: Prisma.PowerSupplyUpdateInput,
  ): Promise<PowerSupply> {
    return this.prisma.powerSupply.update({ where, data });
  }

  async deletePowerSupply(
    where: Prisma.PowerSupplyWhereUniqueInput,
  ): Promise<PowerSupply> {
    return this.prisma.powerSupply.delete({ where });
  }
}
