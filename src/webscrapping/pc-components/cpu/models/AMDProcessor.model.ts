export class AMDProcessorModel {
  id: number;
  name: string;
  model: string;
  generation: number;
  specificator: string;
  series: string;
  seriesDetail: string;
  platform: string;
  codes: string[];
  launchDate: Date;
  cores: number;
  threads: number;
  gpuCores: number;
  baseFrecuency: number;
  maxFrecuency: number;
  l1Cache: number;
  l2Cache: number;
  l3Cache: number;
  isUnlocked: boolean;
  lithography: number;
  socket: string;
  socketCount: string;
  portType: string;
  thermalSolution: string;
  thermalSolution2: string;
  tdp: number;
  maxTdp: string;
  maxTemperature: number;
  supportedOS: string;
  maxMemory: number;
  memoryType: string;
  memoryChannels: number;
  graphicsFrecuency: number;
  graphicsName: string;
}
