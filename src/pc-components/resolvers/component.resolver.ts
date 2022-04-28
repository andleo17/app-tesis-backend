import { Query, Resolver } from '@nestjs/graphql';
import { ComponentModel } from '../models/component.model';
import { ComponentsService } from '../services/component.service';

@Resolver(() => ComponentModel)
export class ComponentResolver {
  constructor(private readonly componentService: ComponentsService) {}

  @Query(() => [ComponentModel])
  async getComponents(): Promise<ComponentModel[]> {
    return this.componentService.getComponents();
  }

  @Query(() => ComponentModel)
  async getComponent(id: number): Promise<ComponentModel> {
    return this.componentService.getComponent(id);
  }
}
