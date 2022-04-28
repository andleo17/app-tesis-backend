import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { RamModel } from '../models/ram.model';
import { RamService } from '../services/ram.service';

@Resolver(() => RamModel)
export class RamResolver {
  constructor(private readonly ramService: RamService) {}

  @Query(() => [RamModel])
  async getRams(): Promise<RamModel[]> {
    return this.ramService.getRams();
  }

  @Query(() => RamModel)
  async getRam(@Args('id', { type: () => Int }) id: number): Promise<RamModel> {
    return this.ramService.getRam({ componentId: id });
  }
}
