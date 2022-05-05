import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AMDProcessorService } from '../sources/AMD.scrap';

@Module({
  imports: [HttpModule],
  providers: [AMDProcessorService],
  exports: [AMDProcessorService],
})
export class AMDScrapModule {}
