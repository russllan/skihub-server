import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.enableCors({
    origin: ['https://skihub-server-production.up.railway.app/', 'http://localhost:3000'], // Разрешенный источник запросов (замените на свой домен)
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Разрешенные методы HTTP
    allowedHeaders: ['Content-Type', 'Authorization'], // Разрешенные заголовки запросов
  });

  const config = new DocumentBuilder()
    .setTitle('skihub-server')
    .setDescription('The skihub API description')
    .setVersion('1.0')
    .addTag('user')
    .addTag('auth')
    .addTag('base')
    .addTag('product')
    .addTag('review')
    .addTag('tour')
    .addTag('booked-product')
    .addTag('booked-tour')
    .addApiKey({
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'Swagger UI', // Название вашего API
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
