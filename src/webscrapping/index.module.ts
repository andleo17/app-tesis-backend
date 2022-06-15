import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { PCComponentsScrappingModule } from './pc-components/index.module';

@Module({
  imports: [CommandModule, PCComponentsScrappingModule],
})
export class WebScrappingModule {}
