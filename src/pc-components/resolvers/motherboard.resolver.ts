import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { MotherboardModel } from '../models/motherboard.model';
import { MotherboardService } from '../services/motherboard.service';

@Resolver(() => MotherboardModel)
export class MotherboardResolver {
  constructor(private readonly motherboardService: MotherboardService) {}

  @Query(() => [MotherboardModel])
  async getMotherboards(): Promise<MotherboardModel[]> {
    return this.motherboardService.getMotherboards();
  }

  @Query(() => MotherboardModel)
  async getMotherboard(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<MotherboardModel> {
    return this.motherboardService.getMotherboard({ componentId: id });
  }
}
