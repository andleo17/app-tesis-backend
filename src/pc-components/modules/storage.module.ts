import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/databases/questions/prisma.module';
import { StorageResolver } from '../resolvers/storage.resolver';
import { StorageService } from '../services/storage.service';

@Module({
  imports: [PrismaModule],
  providers: [StorageResolver, StorageService],
})
export class StorageModule {}
