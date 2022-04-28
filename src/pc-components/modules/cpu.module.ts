import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/databases/questions/prisma.module';
import { CpuResolver } from '../resolvers/cpu.resolver';
import { CpuService } from '../services/cpu.service';

@Module({
  imports: [PrismaModule],
  providers: [CpuResolver, CpuService],
})
export class CpuModule {}
