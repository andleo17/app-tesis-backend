import { QuestionLabelModel } from '../models/questionLabel.model';

export default <QuestionLabelModel>{
  'pg-time_on_day': {
    1: {},
  },
  'pg-store': {
    1: {
      storage: [{ capacity: 500, capacityUnit: 'GB', type: 'SSD' }],
    },
    2: {
      storage: [
        { capacity: 500, capacityUnit: 'GB', type: 'SSD' },
        { capacity: 1, capacityUnit: 'TB', type: 'HDD' },
      ],
    },
    3: {
      storage: [{ capacity: 250, capacityUnit: 'GB', type: 'SSD' }],
    },
    4: {
      storage: [{ capacity: 500, capacityUnit: 'GB' }],
    },
    5: {
      storage: [{ capacity: 1, capacityUnit: 'TB' }],
    },
    6: {
      storage: [
        { capacity: 250, capacityUnit: 'GB', type: 'M.2 SSD' },
        { capacity: 1, capacityUnit: 'TB', type: 'HDD' },
      ],
    },
  },
  'pg-use_of_computer': {
    1: {
      cpu: {
        admitedMemory: ['DDR4-2400'],
        baseFrecuency: 3,
        cores: 4,
        threads: 4,
        generation: 8,
        maxMemory: 32,
      },
      gpu: {
        connectorHDMI: 1,
        memory: 2,
      },
      motherboard: {
        formFactor: 'ATX',
        memorySlots: 2,
        memoryDualChannel: true,
        portsM2PCIe: 1,
        memoryType: 'DDR4',
      },
      powerSupply: {
        power: 500,
      },
      ram: {
        capacity: 8,
        format: 'DIMM',
        frequency: 2400,
        type: 'DDR4',
      },
      storage: [
        { capacity: 500, capacityUnit: 'GB', type: 'M.2 SSD' },
        { capacity: 1, capacityUnit: 'TB', type: 'HDD' },
      ],
    },
  },
  'gaming-videogame_categories': { 1: {} },
  'gaming-emulators': { 1: {} },
  'gaming-quality': { 1: {} },
  'gaming-fps': { 1: {} },
  'office-space': { 1: {} },
  'office-max_windows': { 1: {} },
  'streaming-video_quality': { 1: {} },
  'multimedia-file_types': { 1: {} },
  'multimedia-experience': { 1: {} },
  'software-platforms': { 1: {} },
  'software-os': { 1: {} },
  'software-ia': { 1: {} },
  'construction-activities': { 1: {} },
};
