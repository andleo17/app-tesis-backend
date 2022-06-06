import { Module } from '@nestjs/common';
import { CrucialRamScrapModule } from './modules/crucial.module';

@Module({
  imports: [CrucialRamScrapModule],
})
export class RamScrapModule {}
