import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/databases/questions/prisma.module';
import { StorageScrapCommand } from './index.commands';
import { WesternDigitalStorageScrapModule } from './modules/wd.module';

@Module({
  imports: [PrismaModule, WesternDigitalStorageScrapModule],
  providers: [StorageScrapCommand],
})
export class StorageScrapModule {}
