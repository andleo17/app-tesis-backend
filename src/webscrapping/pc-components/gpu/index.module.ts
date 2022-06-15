import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/databases/questions/prisma.module';
import { GpuScrapCommand } from './gpu.command';
import { GigabyteGPUScrapModule } from './modules/gigabyte.module';

@Module({
  imports: [PrismaModule, GigabyteGPUScrapModule],
  providers: [GpuScrapCommand],
})
export class GpuScrapModule {}
