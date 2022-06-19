import { CpuModel } from 'src/pc-components/models/cpu.model';
import { GpuModel } from 'src/pc-components/models/gpu.model';
import { MotherboardModel } from 'src/pc-components/models/motherboard.model';
import { PowerSuplyModel } from 'src/pc-components/models/powerSupply.model';
import { RamModel } from 'src/pc-components/models/ram.model';
import { StorageModel } from 'src/pc-components/models/storage.model';

export type QuestionLabelModel = {
  [label: string]: {
    [position: number]: TechnicalSpecifications;
  };
};

export type TechnicalSpecifications = {
  cpu?: Partial<CpuModel>;
  gpu?: Partial<GpuModel>;
  ram?: Partial<RamModel>;
  storage?: Partial<StorageModel>[];
  powerSupply?: Partial<PowerSuplyModel>;
  motherboard?: Partial<MotherboardModel>;
};
