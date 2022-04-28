import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/databases/questions/prisma.module';
import { ComponentResolver } from '../resolvers/component.resolver';
import { ComponentsService } from '../services/component.service';

@Module({
  imports: [PrismaModule],
  providers: [ComponentResolver, ComponentsService],
})
export class ComponentModule {}
