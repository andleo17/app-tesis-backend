import { Module } from '@nestjs/common';
import { AsrockScrapModule } from './modules/asrock.module';
import { GigabyteMotherboardScrapModule } from './modules/gigabyte.module';

@Module({
  imports: [AsrockScrapModule, GigabyteMotherboardScrapModule],
})
export class MotherboardScrapModule {}
