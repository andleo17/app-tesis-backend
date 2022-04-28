import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { StorageModel } from '../models/storage.model';
import { StorageService } from '../services/storage.service';

@Resolver(() => StorageModel)
export class StorageResolver {
  constructor(private readonly storageService: StorageService) {}

  @Query(() => [StorageModel])
  async getStorages(): Promise<StorageModel[]> {
    return this.storageService.getStorages();
  }

  @Query(() => StorageModel)
  async getStorage(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<StorageModel> {
    return this.storageService.getStorage({ componentId: id });
  }
}
