import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/databases/questions/prisma.module';
import { RamScrapCommand } from './index.command';
import { CrucialRamScrapModule } from './modules/crucial.module';

@Module({
  imports: [PrismaModule, CrucialRamScrapModule],
  providers: [RamScrapCommand],
})
export class RamScrapModule {}
