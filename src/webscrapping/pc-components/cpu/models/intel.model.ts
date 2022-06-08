export class IntelModel {
  id: number;
  url: string;
  launchDate: Date;
  image: string;
  family: string;
  platform: string;
  model: string;
  generation: number;
  lithography: number;
  cores: number;
  threads: number;
  baseFrecuency: number;
  maxFrecuency: number;
  maxMemory: number;
  memoryTypes: string[];
  maxChannelMemory: number;
  cache: number;
  tdp: number;
  socket: string;
  maxTemperature: number;
  graphics: {
    name: string;
    baseFrecuency: number;
    maxFrecuency: number;
    maxMemory: number;
    maxResolutionHDMI: string;
    maxResolutionDP: string;
  };
}
