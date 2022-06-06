import { Module } from '@nestjs/common';
import { PowerSupplyModule } from 'src/pc-components/modules/powerSupply.module';
import { CpuScrapModule } from './cpu/index.module';
import { DeltronModule } from './global/deltron.module';
import { GpuScrapModule } from './gpu/index.module';
import { MotherboardScrapModule } from './motherboard/index.module';
import { RamScrapModule } from './ram/index.module';

@Module({
  imports: [
    DeltronModule,
    CpuScrapModule,
    GpuScrapModule,
    MotherboardScrapModule,
    PowerSupplyModule,
    RamScrapModule,
  ],
})
export class PCComponentsScrappingModule {}
