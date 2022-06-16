export class WesternDigitalStorageModel {
  code: string;
  model: string;
  type: string;
  formFactor: string;
  diskSpeed: number;
  transferRate: number;
  capacity: number;
  capacityUnit: string;
  interface: string;
  connector: string;
  haveSink: boolean;
  dimensions: {
    height: number;
    width: number;
    depth: number;
  };
  readVelocity: number;
  writeVelocity: number;
  image: string;
  url: string;
}
