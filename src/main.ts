import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './app/AllExceptionsFilter';
import { ConfigService } from '@nestjs/config';

// async function setupSwagger(app) {
//   const configService = app.get(ConfigService);

//   const appName = configService.get('APP_NAME') || 'OMZ';
//   const appDesc = `${appName} API`;
//   const apiVersion = configService.get('API_VERSION') || '1.0';

//   const options = new DocumentBuilder()
//     .setTitle('')
//     .setDescription(appDesc)
//     .setVersion(apiVersion)
//     .addTag('')
//     .addBearerAuth()
//     .setExternalDoc('OpenAPI Specification', '/docs-json')
//     .build();
//   const document = SwaggerModule.createDocument(app, options);
//   SwaggerModule.setup('docs', app, document, {
//     swaggerOptions: {
//       docExpansion: 'none',
//       persistAuthorization: true,
//     },
//   });
// }

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api'); //
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  await app.listen(3006);
}
bootstrap();
