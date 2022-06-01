import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MotherboardScrap } from '../services/Motherboard.scrap';
import { GigabyteMotherboardsService } from '../sources/gigabyte.scrap';

@Module({
  imports: [HttpModule],
  providers: [
    GigabyteMotherboardsService,
    {
      provide: MotherboardScrap,
      useClass: GigabyteMotherboardsService,
    },
  ],
  exports: [GigabyteMotherboardsService],
})
export class GigabyteMotherboardScrapModule {}
