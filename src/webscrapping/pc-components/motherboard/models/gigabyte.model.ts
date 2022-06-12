export class GigabyteMotherboardModel {
  id: number;
  name: string;
  url: string;
  image: string;
  formFactor: string;
  publishDate: Date;
  processor: {
    brand: string;
    chipset: string;
    socket: string;
  };
  memory: {
    frecuencies: string[];
    type: string;
    format: string;
    slots: number;
    maxSupport: number;
    hasDualChannel: boolean;
    hasXMP: boolean;
  };
  graphics: {
    port: string;
    quantity: number;
    maxResolution: string;
    frecuency: number;
  }[];
  lan: {
    chipset: string;
    velocity: string[];
  }[];
  slots: {
    name: string;
    quantity: number;
  }[];
  wireless: {
    hasWifi: boolean;
    hasBluetooth: boolean;
  };
  multigraphics: {
    nvidia: boolean;
    amd: boolean;
  };
  storage: {
    connector: string;
    slots: number;
    interface: string;
  }[];
  usb: {
    type: string;
    slots: number;
    isInBackPanel: boolean;
  }[];
}
