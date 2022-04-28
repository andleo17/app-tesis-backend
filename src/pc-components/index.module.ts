import { Module } from '@nestjs/common';
import { ComponentModule } from './modules/component.module';
import { CpuModule } from './modules/cpu.module';
import { GpuModule } from './modules/gpu.module';
import { MotherboardModule } from './modules/motherboard.module';
import { PowerSupplyModule } from './modules/powerSupply.module';
import { RamModule } from './modules/ram.module';
import { StorageModule } from './modules/storage.module';

@Module({
  imports: [
    ComponentModule,
    CpuModule,
    GpuModule,
    MotherboardModule,
    PowerSupplyModule,
    RamModule,
    StorageModule,
  ],
})
export class PCComponentsModule {}
