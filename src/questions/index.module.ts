import { Module } from '@nestjs/common';
import { QuestionModule } from './modules/question.module';
import { QuestionCategoryModule } from './modules/questionCategory.module';
import { QuestionOptionModule } from './modules/questionOption.module';

@Module({
  imports: [QuestionOptionModule, QuestionModule, QuestionCategoryModule],
})
export class QuestionsModule {}
