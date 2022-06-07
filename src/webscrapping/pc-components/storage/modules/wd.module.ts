import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { WesternDigitalStorageScrapService } from '../sources/wd.scrap';

@Module({
  imports: [HttpModule],
  providers: [WesternDigitalStorageScrapService],
  exports: [WesternDigitalStorageScrapService],
})
export class WesternDigitalStorageScrapModule {}
