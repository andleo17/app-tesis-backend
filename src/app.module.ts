import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { RecommendationModule } from './pc-components-recommendation/index.module';
import { PCComponentsModule } from './pc-components/index.module';
import { QuestionsModule } from './questions/index.module';

@Module({
  imports: [
    QuestionsModule,
    PCComponentsModule,
    RecommendationModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
  ],
})
export class AppModule {}
