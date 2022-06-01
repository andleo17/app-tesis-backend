import { Module } from '@nestjs/common';
import { AsrockScrapModule } from './models/asrock.module';
import { GigabyteMotherboardScrapModule } from './modules/gigabyte.module';

@Module({
  imports: [AsrockScrapModule, GigabyteMotherboardScrapModule],
})
export class MotherboardScrapModule {}
