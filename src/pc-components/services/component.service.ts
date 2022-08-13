import { Injectable } from '@nestjs/common';
import { Component, ComponentType, Prisma } from '@prisma/client';
import { PrismaService } from 'src/databases/questions/prisma.service';

@Injectable()
export class ComponentsService {
  constructor(private readonly prisma: PrismaService) {}

  async getComponents(
    where?: Prisma.ComponentWhereInput,
  ): Promise<(Component & { type: ComponentType })[]> {
    return this.prisma.component.findMany({ where, include: { type: true } });
  }

  async getComponent(id: number): Promise<Component & { type: ComponentType }> {
    return this.prisma.component.findUnique({
      where: { id },
      include: {
        type: true,
        cpu: true,
        gpu: true,
        motherboard: true,
        powerSupply: true,
        ram: true,
        storage: true,
      },
    });
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
