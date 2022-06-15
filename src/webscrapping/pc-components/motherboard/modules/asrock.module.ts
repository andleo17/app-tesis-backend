import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AsrockService } from '../sources/asrock.scrap';

@Module({
  imports: [HttpModule],
  providers: [AsrockService],
  exports: [AsrockService],
})
export class AsrockScrapModule {}
