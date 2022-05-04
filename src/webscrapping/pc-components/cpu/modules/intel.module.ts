import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { IntelService } from '../sources/intel.scrap';

@Module({
  imports: [HttpModule],
  providers: [IntelService],
  exports: [IntelService],
})
export class IntelScrapModule {}
