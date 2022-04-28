import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/databases/questions/prisma.module';
import { MotherboardResolver } from '../resolvers/motherboard.resolver';
import { MotherboardService } from '../services/motherboard.service';

@Module({
  imports: [PrismaModule],
  providers: [MotherboardResolver, MotherboardService],
})
export class MotherboardModule {}
