import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { PowerSuplyModel } from '../models/powerSupply.model';
import { PowerSupplyService } from '../services/powerSupply.service';

@Resolver(() => PowerSuplyModel)
export class PowerSupplyResolver {
  constructor(private readonly powerSupplyService: PowerSupplyService) {}

  @Query(() => [PowerSuplyModel])
  async getPowerSupplies(): Promise<PowerSuplyModel[]> {
    return this.powerSupplyService.getPowerSupplies();
  }

  @Query(() => PowerSuplyModel)
  async getPowerSupply(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<PowerSuplyModel> {
    return this.powerSupplyService.getPowerSupply({ componentId: id });
  }
}
