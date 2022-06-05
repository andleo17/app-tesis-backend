import { Module } from '@nestjs/common';
import { GigabyteGPUScrapModule } from './modules/gigabyte.module';

@Module({
  imports: [GigabyteGPUScrapModule],
})
export class GpuScrapModule {}
