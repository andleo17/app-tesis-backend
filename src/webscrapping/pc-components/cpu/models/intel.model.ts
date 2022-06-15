export class IntelModel {
  id: number;
  fabricatorId: string;
  url: string;
  model: string;
  socket: string;
  generation: number;
  family: string;
  lithography: number;
  specificator: string;
  launchDate: Date;
  platform: string;
  image: string;
  cores: number;
  threads: number;
  baseFrecuency: number;
  maxFrecuency: number;
  cache: number;
  tdp: number;
  maxTemperature: number;
  maxMemory: number;
  memoryTypes: string[];
  maxChannelMemory: number;
  graphics: {
    name: string;
    baseFrecuency: number;
    maxFrecuency: number;
    maxMemory: number;
    maxResolutionHDMI: string;
    maxResolutionDP: string;
  };
}
