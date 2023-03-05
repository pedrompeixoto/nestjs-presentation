import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './common/middleware/logger/logger.middleware';
import { PrismaClientExceptionFilter } from './core/exception-filters/prisma-client-exception/prisma-client-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.enableShutdownHooks();
  // app.useGlobalFilters(new HttpExceptionFilter());
  // app.useGlobalGuards(new RolesGuard());
  app.use(logger);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  await app.listen(3000);
}
bootstrap();
