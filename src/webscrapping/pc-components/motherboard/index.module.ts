import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/databases/questions/prisma.module';
import { MotherboardScrapCommand } from './index.command';
import { AsrockScrapModule } from './modules/asrock.module';
import { GigabyteMotherboardScrapModule } from './modules/gigabyte.module';

@Module({
  imports: [PrismaModule, AsrockScrapModule, GigabyteMotherboardScrapModule],
  providers: [MotherboardScrapCommand],
})
export class MotherboardScrapModule {}
