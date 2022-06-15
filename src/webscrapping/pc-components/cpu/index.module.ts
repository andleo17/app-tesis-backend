import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/databases/questions/prisma.module';
import { CPUScrapCommand } from './index.command';
import { AMDScrapModule } from './modules/AMD.module';
import { IntelScrapModule } from './modules/intel.module';

@Module({
  imports: [PrismaModule, IntelScrapModule, AMDScrapModule],
  providers: [CPUScrapCommand],
})
export class CpuScrapModule {}
