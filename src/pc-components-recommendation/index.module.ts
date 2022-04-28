import { Module } from '@nestjs/common';
import { FormModule } from './modules/form.module';

@Module({
  imports: [FormModule],
})
export class RecommendationModule {}
