import { Module } from '@nestjs/common';
import { PCComponentsScrappingModule } from './pc-components/index.module';

@Module({
  imports: [PCComponentsScrappingModule],
})
export class WebScrappingModule {}
