import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecommendationModule } from './pc-components-recommendation/index.module';
import { PCComponentsModule } from './pc-components/index.module';
import { QuestionsModule } from './questions/index.module';
import { WebScrappingModule } from './webscrapping/index.module';

@Module({
  imports: [
    QuestionsModule,
    PCComponentsModule,
    RecommendationModule,
    WebScrappingModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
