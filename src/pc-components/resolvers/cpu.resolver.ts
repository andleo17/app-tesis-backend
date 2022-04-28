import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { CpuModel } from '../models/cpu.model';
import { CpuService } from '../services/cpu.service';

@Resolver(() => CpuModel)
export class CpuResolver {
  constructor(private readonly cpuService: CpuService) {}

  @Query(() => [CpuModel])
  async getCpus(): Promise<CpuModel[]> {
    return this.cpuService.getCpus();
  }

  @Query(() => CpuModel)
  async getCpu(@Args('id', { type: () => Int }) id: number): Promise<CpuModel> {
    return this.cpuService.getCpu({ componentId: id });
  }
}
