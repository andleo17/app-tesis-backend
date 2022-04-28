import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/databases/questions/prisma.module';
import { RamResolver } from '../resolvers/ram.resolver';
import { RamService } from '../services/ram.service';

@Module({
  imports: [PrismaModule],
  providers: [RamResolver, RamService],
})
export class RamModule {}
