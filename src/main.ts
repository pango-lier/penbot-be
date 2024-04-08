import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './app/AllExceptionsFilter';
import { WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';

import { logFormat } from '@common/helpers/log.helper';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import DailyRotateFile from 'winston-daily-rotate-file';

async function setupSwagger(app) {
  const configService = app.get(ConfigService);

  const appName = configService.get('APP_NAME') || 'OMZ';
  const appDesc = `${appName} API`;
  const apiVersion = configService.get('API_VERSION') || '1.0';

  const options = new DocumentBuilder()
    .setTitle('')
    .setDescription(appDesc)
    .setVersion(apiVersion)
    .addTag('')
    .addBearerAuth()
    .setExternalDoc('OpenAPI Specification', '/docs-json')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      docExpansion: 'none',
      persistAuthorization: true,
    },
  });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    abortOnError: false,
    logger: WinstonModule.createLogger({
      format: format.combine(format.splat(), format.simple()),
      transports: [
        new transports.Console({
          level: 'verbose',
          format: format.combine(
            format.ms(),
            format.prettyPrint(),
            logFormat(),
            format.colorize({ all: true }),
          ),
        }),
        // new DailyRotateFile({
        //   level: process.env.LOG_LEVEL || 'info',
        //   dirname: 'logs',
        //   filename: 'nestjs-%DATE%.log',
        //   datePattern: 'YYYY-MM-DD-HH',
        //   zippedArchive: true,
        //   maxSize: '20m',
        //   maxFiles: '14d',
        // }),
      ],
    }),
  });
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api'); //
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  await app.listen(3006);
}
bootstrap();
