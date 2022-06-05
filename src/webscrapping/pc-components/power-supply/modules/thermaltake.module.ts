import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PowersupplyScrap } from '../services/Powersupply.scrap';
import { ThermaltakePowerSupplyService } from '../sources/thermaltake.scrap';

@Module({
  imports: [HttpModule],
  providers: [
    ThermaltakePowerSupplyService,
    {
      provide: PowersupplyScrap,
      useClass: ThermaltakePowerSupplyService,
    },
  ],
  exports: [ThermaltakePowerSupplyService],
})
export class ThermaltakePowerSupplyScrapModule {}
