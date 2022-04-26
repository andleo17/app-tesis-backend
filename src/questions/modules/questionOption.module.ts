import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/databases/questions/prisma.module';
import { QuestionOptionResolver } from '../resolvers/questionOption.resolver';
import { QuestionService } from '../services/question.service';
import { QuestionOptionService } from '../services/questionOption.service';

@Module({
  imports: [PrismaModule],
  providers: [QuestionOptionService, QuestionOptionResolver, QuestionService],
})
export class QuestionOptionModule {}
