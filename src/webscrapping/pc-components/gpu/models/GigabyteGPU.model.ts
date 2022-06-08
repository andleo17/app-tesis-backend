export class GigabyteGPUModel {
  id: number;
  model: string;
  url: string;
  publishDate: Date;
  name: string;
  chipset: string;
  vendor: string;
  vram: number;
  image: string;
  baseFrecuency: number;
  maxFrecuency: number;
  cudaCores: number;
  memoryClock: number;
  memoryType: string;
  memoryBus: number;
  memoryBandwidth: number;
  cardBus: string;
  maxResolution: string;
  maxDisplays: number;
  cardSize: {
    long: number;
    width: number;
    height: number;
  };
  cardForm: string;
  directXVersion: string;
  openGlVersion: string;
  tdp: number;
  pines: string;
  outputs: { [key: string]: number }[];
  SLISupport: boolean;
  fans: string;
}
