import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CrucialRamScrapService } from '../sources/crucial.scrap';

@Module({
  imports: [HttpModule],
  providers: [CrucialRamScrapService],
  exports: [CrucialRamScrapService],
})
export class CrucialRamScrapModule {}
