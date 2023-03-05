import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from './config/config.module';
import { CoreModule } from './core/core.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './common/guards/roles/roles.guard';

@Module({
  imports: [CoreModule, UsersModule, ConfigModule.register({ folder: './config' })],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: RolesGuard,
  },],
})
export class AppModule  {
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(LoggerMiddleware)
//       .forRoutes('users');
//   }
}
