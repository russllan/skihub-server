import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api');

  app.enableCors({
    origin: [
      'https://skihub-server-production.up.railway.app',
      'http://localhost:3000',
      'http://localhost:5173',
    ], // Разрешенный источник запросов (замените на свой домен)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'patch', 'OPTIONS', 'HEAD'], // Разрешенные методы HTTP
    allowedHeaders: ['Content-Type', 'Authorization'], // Разрешенные заголовки запросов
  });

  // app.enableCors({
  //   origin: 'http://localhost:3000', // Укажите нужный вам origin
  //   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  //   allowedHeaders: ['Content-Type', 'Authorization'],
  //   credentials: true,
  // });

  // app.enableCors({
  //     origin: '*', // Разрешенный источник запросов (замените на свой домен)
  //     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Разрешенные методы HTTP
  //   });

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
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'Swagger UI', // Название вашего API
  });
  await app.listen(process.env.PORT || 3001);
}
bootstrap();
