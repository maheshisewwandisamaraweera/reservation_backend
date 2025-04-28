import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api'); // All routes now start with /api
  app.enableCors();            // Enable CORS if your frontend (React, etc.) needs to access this API

  await app.listen(3000);      // App runs on http://localhost:3000
}
bootstrap();
