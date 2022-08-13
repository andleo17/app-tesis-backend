import { Injectable } from '@nestjs/common';
import { Cpu, Prisma } from '@prisma/client';
import { PrismaService } from 'src/databases/questions/prisma.service';

@Injectable()
export class CpuService {
  constructor(private readonly prisma: PrismaService) {}

  async getCpu(where: Prisma.CpuWhereUniqueInput): Promise<Cpu> {
    return this.prisma.cpu.findUnique({
      where,
      include: { component: { include: { type: true } } },
    });
  }

  async getCpus(where?: Prisma.CpuWhereInput): Promise<Cpu[]> {
    return this.prisma.cpu.findMany({ where });
  }

  async createCpu(data: Prisma.CpuCreateInput): Promise<Cpu> {
    return this.prisma.cpu.create({ data });
  }

  async updateCpu(
    where: Prisma.CpuWhereUniqueInput,
    data: Prisma.CpuUpdateInput,
  ): Promise<Cpu> {
    return this.prisma.cpu.update({ where, data });
  }

  async deleteCpu(where: Prisma.CpuWhereUniqueInput): Promise<Cpu> {
    return this.prisma.cpu.delete({ where });
  }
}
