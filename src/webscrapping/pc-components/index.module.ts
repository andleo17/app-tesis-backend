import { Module } from '@nestjs/common';
import { CpuScrapModule } from './cpu/index.module';
import { DeltronModule } from './global/deltron.module';
import { GpuScrapModule } from './gpu/index.module';
import { MotherboardScrapModule } from './motherboard/index.module';
import { PowerSupplyScrapModule } from './power-supply/index.module';
import { RamScrapModule } from './ram/index.module';
import { StorageScrapModule } from './storage/index.module';

@Module({
  imports: [
    DeltronModule,
    CpuScrapModule,
    GpuScrapModule,
    MotherboardScrapModule,
    PowerSupplyScrapModule,
    RamScrapModule,
    StorageScrapModule,
  ],
})
export class PCComponentsScrappingModule {}
