import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/databases/questions/prisma.module';
import { FormResolver } from '../resolvers/form.resolver';
import { RecommendationService } from '../services/recommendation.service';

@Module({
  imports: [PrismaModule],
  providers: [FormResolver, RecommendationService],
})
export class FormModule {}
