import { Module } from '@nestjs/common';
import { ThermaltakePowerSupplyScrapModule } from './modules/thermaltake.module';

@Module({
  imports: [ThermaltakePowerSupplyScrapModule],
})
export class PowerSupplyScrapModule {}
