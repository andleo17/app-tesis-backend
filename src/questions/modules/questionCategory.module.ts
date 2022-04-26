import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/databases/questions/prisma.module';
import { QuestionCategoryResolver } from '../resolvers/questionCategory.resolver';
import { QuestionService } from '../services/question.service';
import { QuestionCategoryService } from '../services/questionCategory.service';

@Module({
  imports: [PrismaModule],
  providers: [
    QuestionCategoryService,
    QuestionCategoryResolver,
    QuestionService,
  ],
})
export class QuestionCategoryModule {}
