import { Injectable } from '@nestjs/common';
import { Motherboard, Prisma } from '@prisma/client';
import { PrismaService } from 'src/databases/questions/prisma.service';

@Injectable()
export class MotherboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getMotherboard(
    where: Prisma.MotherboardWhereUniqueInput,
  ): Promise<Motherboard> {
    return this.prisma.motherboard.findUnique({
      where,
      include: { component: true },
    });
  }

  async getMotherboards(
    where?: Prisma.MotherboardWhereInput,
  ): Promise<Motherboard[]> {
    return this.prisma.motherboard.findMany({ where });
  }

  async createMotherboard(
    data: Prisma.MotherboardCreateInput,
  ): Promise<Motherboard> {
    return this.prisma.motherboard.create({ data });
  }

  async updateMotherboard(
    where: Prisma.MotherboardWhereUniqueInput,
    data: Prisma.MotherboardUpdateInput,
  ): Promise<Motherboard> {
    return this.prisma.motherboard.update({ where, data });
  }

  async deleteMotherboard(
    where: Prisma.MotherboardWhereUniqueInput,
  ): Promise<Motherboard> {
    return this.prisma.motherboard.delete({ where });
  }
}
