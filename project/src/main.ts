import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { RolesGuard } from './common/guards/roles/roles.guard';
import { logger } from './common/middleware/logger/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.enableShutdownHooks();
  // app.useGlobalFilters(new HttpExceptionFilter());
  // app.useGlobalGuards(new RolesGuard());
  app.use(logger);
  await app.listen(3000);
}
bootstrap();
