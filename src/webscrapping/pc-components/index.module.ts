import { Module } from '@nestjs/common';
import { CpuScrapModule } from './cpu/index.module';
import { DeltronModule } from './global/deltron.module';

@Module({
  imports: [DeltronModule, CpuScrapModule],
})
export class PCComponentsScrappingModule {}
