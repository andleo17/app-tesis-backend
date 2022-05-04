import { Module } from '@nestjs/common';
import { IntelScrapModule } from './modules/intel.module';

@Module({
  imports: [IntelScrapModule],
})
export class CpuScrapModule {}
