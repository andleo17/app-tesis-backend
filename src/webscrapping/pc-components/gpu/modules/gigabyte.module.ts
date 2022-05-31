import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GraphicCardScrap } from '../services/GraphicCard.scrap';
import { GigabyteGraphicsService } from '../sources/gigabyte.scrap';

@Module({
  imports: [HttpModule],
  providers: [
    GigabyteGraphicsService,
    {
      provide: GraphicCardScrap,
      useClass: GigabyteGraphicsService,
    },
  ],
  exports: [GigabyteGraphicsService],
})
export class GigabyteGPUScrapModule {}
