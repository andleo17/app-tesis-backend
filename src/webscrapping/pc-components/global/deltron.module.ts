import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { DeltronService } from './deltron.scrap';

@Module({
  imports: [HttpModule],
  providers: [DeltronService],
})
export class DeltronModule {}
