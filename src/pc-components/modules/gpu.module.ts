import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/databases/questions/prisma.module';
import { GpuResolver } from '../resolvers/gpu.resolver';
import { GpuService } from '../services/gpu.service';

@Module({
  imports: [PrismaModule],
  providers: [GpuResolver, GpuService],
})
export class GpuModule {}
