export class ThermaltakePowerSupplyModel {
  name: string;
  url: string;
  photoURL: string;
  price: number;
  codes: string[];
  rgb: boolean;
  type: string;
  releaseDate: Date;
  dimmensions: {
    width: number;
    height: number;
    depth: number;
  };
  formFactor: string;
  pciPines: number;
  power: number;
  current: number;
  voltage: {
    min: number;
    max: number;
  };
  frequency: {
    min: number;
    max: number;
  };
  output: {
    min: number;
    max: number;
  };
  efficiency80plus: string;
  modularity: number;
}
