import { Module } from '@nestjs/common';
import { AMDScrapModule } from './modules/AMD.module';
import { IntelScrapModule } from './modules/intel.module';

@Module({
  imports: [IntelScrapModule, AMDScrapModule],
})
export class CpuScrapModule {}
