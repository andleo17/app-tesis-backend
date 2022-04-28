import { Injectable } from '@nestjs/common';
import { Prisma, Storage } from '@prisma/client';
import { PrismaService } from 'src/databases/questions/prisma.service';

@Injectable()
export class StorageService {
  constructor(private readonly prisma: PrismaService) {}

  async getStorage(where: Prisma.StorageWhereUniqueInput): Promise<Storage> {
    return this.prisma.storage.findUnique({
      where,
      include: { component: true },
    });
  }

  async getStorages(where?: Prisma.StorageWhereInput): Promise<Storage[]> {
    return this.prisma.storage.findMany({ where });
  }

  async createStorage(data: Prisma.StorageCreateInput): Promise<Storage> {
    return this.prisma.storage.create({ data });
  }

  async updateStorage(
    where: Prisma.StorageWhereUniqueInput,
    data: Prisma.StorageUpdateInput,
  ): Promise<Storage> {
    return this.prisma.storage.update({ where, data });
  }

  async deleteStorage(where: Prisma.StorageWhereUniqueInput): Promise<Storage> {
    return this.prisma.storage.delete({ where });
  }
}
