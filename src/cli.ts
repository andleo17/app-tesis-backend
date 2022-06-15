import { NestFactory } from '@nestjs/core';
import { CommandModule, CommandService } from 'nestjs-command';
import { WebScrappingModule } from './webscrapping/index.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(WebScrappingModule, {
    logger: ['error'],
  });

  try {
    await app.select(CommandModule).get(CommandService).exec();
    await app.close();
  } catch (error) {
    console.error(error);
    await app.close();
    process.exit(1);
  }
}

bootstrap();
