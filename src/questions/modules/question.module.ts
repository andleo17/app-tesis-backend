import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/databases/questions/prisma.module';
import { QuestionResolver } from '../resolvers/question.resolver';
import { QuestionService } from '../services/question.service';
import { QuestionCategoryService } from '../services/questionCategory.service';
import { QuestionOptionService } from '../services/questionOption.service';

@Module({
  imports: [PrismaModule],
  providers: [
    QuestionService,
    QuestionResolver,
    QuestionOptionService,
    QuestionCategoryService,
  ],
})
export class QuestionModule {}
