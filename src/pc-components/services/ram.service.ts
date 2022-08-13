import { Injectable } from '@nestjs/common';
import { Prisma, Ram } from '@prisma/client';
import { PrismaService } from 'src/databases/questions/prisma.service';

@Injectable()
export class RamService {
  constructor(private readonly prisma: PrismaService) {}

  async getRam(where: Prisma.RamWhereUniqueInput): Promise<Ram> {
    return this.prisma.ram.findUnique({
      where,
      include: { component: { include: { type: true } } },
    });
  }

  async getRams(where?: Prisma.RamWhereInput): Promise<Ram[]> {
    return this.prisma.ram.findMany({ where });
  }

  async createRam(data: Prisma.RamCreateInput): Promise<Ram> {
    return this.prisma.ram.create({ data });
  }

  async updateRam(
    where: Prisma.RamWhereUniqueInput,
    data: Prisma.RamUpdateInput,
  ): Promise<Ram> {
    return this.prisma.ram.update({ where, data });
  }

  async deleteRam(where: Prisma.RamWhereUniqueInput): Promise<Ram> {
    return this.prisma.ram.delete({ where });
  }
}
