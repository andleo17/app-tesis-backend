import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/databases/questions/prisma.module';
import { PowerSupplyScrapCommand } from './index.command';
import { ThermaltakePowerSupplyScrapModule } from './modules/thermaltake.module';

@Module({
  imports: [PrismaModule, ThermaltakePowerSupplyScrapModule],
  providers: [PowerSupplyScrapCommand],
})
export class PowerSupplyScrapModule {}
