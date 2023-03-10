import { Global, Module } from '@nestjs/common';
import { Utils } from './utils/utils';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from 'src/config/config.module';

@Global()
@Module({
  imports: [ConfigModule.register({ folder: './config' })],
  providers: [Utils, PrismaService],
  exports: [Utils, PrismaService, ConfigModule]
})
export class CoreModule {}
