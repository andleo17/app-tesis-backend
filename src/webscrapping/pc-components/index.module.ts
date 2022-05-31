import { Module } from '@nestjs/common';
import { CpuScrapModule } from './cpu/index.module';
import { DeltronModule } from './global/deltron.module';
import { GpuScrapModule } from './gpu/index.module';

@Module({
  imports: [DeltronModule, CpuScrapModule, GpuScrapModule],
})
export class PCComponentsScrappingModule {}
