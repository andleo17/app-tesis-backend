import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { GpuModel } from '../models/gpu.model';
import { GpuService } from '../services/gpu.service';

@Resolver(() => GpuModel)
export class GpuResolver {
  constructor(private readonly gpuService: GpuService) {}

  @Query(() => [GpuModel])
  async getGpus(): Promise<GpuModel[]> {
    return this.gpuService.getGpus();
  }

  @Query(() => GpuModel)
  async getGpu(@Args('id', { type: () => Int }) id: number): Promise<GpuModel> {
    return this.gpuService.getGpu({ componentId: id });
  }
}
