import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/databases/questions/prisma.service';
import { ComponentModel } from 'src/pc-components/models/component.model';
import { CpuModel } from 'src/pc-components/models/cpu.model';
import { GpuModel } from 'src/pc-components/models/gpu.model';
import { MotherboardModel } from 'src/pc-components/models/motherboard.model';
import { PowerSuplyModel } from 'src/pc-components/models/powerSupply.model';
import { RamModel } from 'src/pc-components/models/ram.model';
import { StorageModel } from 'src/pc-components/models/storage.model';
import labeling from 'src/questions/db/labeling';
import { TechnicalSpecifications } from 'src/questions/models/questionLabel.model';
import { FormInput } from '../inputs/form.input';

@Injectable()
export class RecommendationService {
  constructor(private readonly prisma: PrismaService) {}

  async getRecommendation(userAnswers: FormInput[]): Promise<ComponentModel[]> {
    console.log({ userAnswers });

    // 1. CPU
    // 2. Motherboard
    // 3. GPU
    // 4. RAM
    // 5. Storage
    // 6. Power Supply

    const userMoney = userAnswers.shift().answer;

    // const userTechnicalSpecifications =
    //   this.getTechnicalSpecifications(userAnswers);

    // const minimumRequirements = this.getMinimumRequirements(
    //   userTechnicalSpecifications,
    // );

    // const cpu = await this.getCpu(minimumRequirements.cpu);
    // const motherboard = await this.getMotherboard(
    //   minimumRequirements.motherboard,
    //   cpu,
    // );
    // const gpu = await this.getGpu(minimumRequirements.gpu);
    // const ram = await this.getRam(minimumRequirements.ram);
    // const storages = await this.getStorages(minimumRequirements.storage);
    // const powerSupply = await this.getPowerSupply(
    //   minimumRequirements.powerSupply,
    // );

    // return [
    //   cpu.component,
    //   motherboard.component,
    //   gpu.component,
    //   ram.component,
    //   powerSupply.component,
    //   ...storages.map((a) => a.component),
    // ];

    // Mock response
    const componentsId = await this.prisma.$transaction([
      this.prisma.component.aggregate({
        _min: { id: true },
        _max: { id: true },
        where: { typeId: 1 },
      }),
      this.prisma.component.aggregate({
        _min: { id: true },
        _max: { id: true },
        where: { typeId: 2 },
      }),
      this.prisma.component.aggregate({
        _min: { id: true },
        _max: { id: true },
        where: { typeId: 3 },
      }),
      this.prisma.component.aggregate({
        _min: { id: true },
        _max: { id: true },
        where: { typeId: 4 },
      }),
      this.prisma.component.aggregate({
        _min: { id: true },
        _max: { id: true },
        where: { typeId: 5 },
      }),
      this.prisma.component.aggregate({
        _min: { id: true },
        _max: { id: true },
        where: { typeId: 6 },
      }),
    ]);

    const randomNumbers = componentsId.map((c) =>
      Math.floor(Math.random() * (c._max.id - c._min.id) + c._min.id),
    );

    const recommendedComponents = await this.prisma.component.findMany({
      where: {
        id: {
          in: randomNumbers,
        },
      },
      include: { type: true },
    });
    return recommendedComponents;
  }

  private getTechnicalSpecifications(
    userResponse: FormInput[],
  ): TechnicalSpecifications[] {
    return userResponse.flatMap((a) => {
      const question = labeling[a.questionLabel];
      if (a.questionLabel) return question[a.questionLabel];
      if (a.multipleChoiceAnswers)
        return a.multipleChoiceAnswers.map((a) => question[a]);
    });
  }

  private getMinimumRequirements(
    userRequirements: TechnicalSpecifications[],
  ): TechnicalSpecifications {
    return userRequirements[0];
  }

  private async getComponentInfo(componentId: number) {
    return this.prisma.component.findUnique({
      where: { id: componentId },
      include: { type: true },
    });
  }

  private async getCpu(cpu: Partial<CpuModel>) {
    const foundCpu = await this.prisma.cpu.findFirst({
      where: {
        baseFrecuency: { gte: cpu.baseFrecuency },
        cores: { gte: cpu.cores },
        generation: { gte: cpu.generation },
        haveIntegratedGraphics: cpu.haveIntegratedGraphics,
        maxMemory: { gte: cpu.maxMemory },
        threads: { gte: cpu.threads },
        turboFrecuency: { gte: cpu.turboFrecuency },
        admitedMemory: { hasSome: cpu.admitedMemory },
      },
    });
    const componentInfo = await this.getComponentInfo(foundCpu.componentId);
    return { ...foundCpu, component: componentInfo };
  }

  private async getMotherboard(
    motherboard: Partial<MotherboardModel>,
    cpu: CpuModel,
  ) {
    const foundMotherboard = await this.prisma.motherboard.findFirst({
      where: {
        chipset: motherboard.chipset,
        formFactor: motherboard.formFactor,
        networkInterfaceMaxSpeed: motherboard.networkInterfaceMaxSpeed,
        memoryDualChannel: motherboard.memoryDualChannel,
        memorySlots: { gte: motherboard.memorySlots },
        memoryType: motherboard.memoryType,
        memoryMaxCapacity: {
          gte: motherboard.memoryMaxCapacity,
        },
        memoryFormat: motherboard.memoryFormat,
        memoryFrecuencies: {
          hasSome: motherboard.memoryFrecuencies,
        },
        socket: cpu.socket,
      },
    });

    const componentInfo = await this.getComponentInfo(
      foundMotherboard.componentId,
    );

    return { ...foundMotherboard, component: componentInfo };
  }

  private async getGpu(gpu: Partial<GpuModel>) {
    const foundGpu = await this.prisma.gpu.findFirst({
      where: {
        connectorHDMI: { gte: gpu.connectorHDMI },
        memory: { gte: gpu.memory },
      },
    });

    const componentInfo = await this.getComponentInfo(foundGpu.componentId);

    return { ...foundGpu, component: componentInfo };
  }

  private async getRam(ram: Partial<RamModel>) {
    const foundRam = await this.prisma.ram.findFirst({
      where: {
        capacity: { gte: ram.capacity },
        format: ram.format,
        frequency: { gte: ram.frequency },
        type: ram.type,
      },
    });

    const componentInfo = await this.getComponentInfo(foundRam.componentId);

    return { ...foundRam, component: componentInfo };
  }

  private async getStorages(storages: Partial<StorageModel>[]) {
    const foundStorages: StorageModel[] = [];
    for (const storage of storages) {
      const foundStorage = await this.prisma.storage.findFirst({
        where: {
          capacity: { gte: storage.capacity },
          capacityUnit: storage.capacityUnit,
          format: storage.format,
          interface: storage.interface,
          type: storage.type,
        },
      });

      const componentInfo = await this.getComponentInfo(
        foundStorage.componentId,
      );
      foundStorages.push({ ...foundStorage, component: componentInfo });
    }

    return foundStorages;
  }

  private async getPowerSupply(powerSupply: Partial<PowerSuplyModel>) {
    const foundPowerSupply = await this.prisma.powerSupply.findFirst({
      where: {
        efficiency: powerSupply.efficiency,
        modularity: powerSupply.modularity,
        power: { gte: powerSupply.power },
      },
    });

    const componentInfo = await this.getComponentInfo(
      foundPowerSupply.componentId,
    );

    return { ...foundPowerSupply, component: componentInfo };
  }
}
