import { Injectable } from '@nestjs/common';
import { Component, Prisma } from '@prisma/client';
import { PrismaService } from 'src/databases/questions/prisma.service';

@Injectable()
export class ComponentsService {
  constructor(private readonly prisma: PrismaService) {}

  async getComponents(
    where?: Prisma.ComponentWhereInput,
  ): Promise<Component[]> {
    return this.prisma.component.findMany({ where });
  }

  async getComponent(id: number): Promise<Component> {
    return this.prisma.component.findUnique({ where: { id } });
  }

  async createComponent(data: Prisma.ComponentCreateInput): Promise<Component> {
    return this.prisma.component.create({ data });
  }

  async updateComponent(
    id: number,
    data: Prisma.ComponentUpdateInput,
  ): Promise<Component> {
    return this.prisma.component.update({ where: { id }, data });
  }

  async deleteComponent(id: number): Promise<Component> {
    return this.prisma.component.delete({ where: { id } });
  }
}
