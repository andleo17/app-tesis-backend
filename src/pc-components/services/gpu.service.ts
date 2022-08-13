import { Injectable } from '@nestjs/common';
import { Gpu, Prisma } from '@prisma/client';
import { PrismaService } from 'src/databases/questions/prisma.service';

@Injectable()
export class GpuService {
  constructor(private readonly prisma: PrismaService) {}

  async getGpu(where: Prisma.GpuWhereUniqueInput): Promise<Gpu> {
    return this.prisma.gpu.findUnique({
      where,
      include: { component: { include: { type: true } } },
    });
  }

  async getGpus(where?: Prisma.GpuWhereInput): Promise<Gpu[]> {
    return this.prisma.gpu.findMany({ where });
  }

  async createGpu(data: Prisma.GpuCreateInput): Promise<Gpu> {
    return this.prisma.gpu.create({ data });
  }

  async updateGpu(
    where: Prisma.GpuWhereUniqueInput,
    data: Prisma.GpuUpdateInput,
  ): Promise<Gpu> {
    return this.prisma.gpu.update({ where, data });
  }

  async deleteGpu(where: Prisma.GpuWhereUniqueInput): Promise<Gpu> {
    return this.prisma.gpu.delete({ where });
  }
}
