import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/databases/questions/prisma.module';
import { PowerSupplyResolver } from '../resolvers/powerSupply.resolver';
import { PowerSupplyService } from '../services/powerSupply.service';

@Module({
  imports: [PrismaModule],
  providers: [PowerSupplyResolver, PowerSupplyService],
})
export class PowerSupplyModule {}
