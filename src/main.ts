import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  
  app.enableCors({
    origin: 'https://skihub-server-production.up.railway.app/', // Разрешенный источник запросов (замените на свой домен)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Разрешенные методы HTTP
    allowedHeaders: ['Content-Type', 'Authorization'], // Разрешенные заголовки запросов
  });;

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
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
