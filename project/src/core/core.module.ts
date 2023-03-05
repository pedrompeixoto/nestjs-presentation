import { Global, Module } from '@nestjs/common';
import { Utils } from './utils/utils';
import { PrismaService } from './prisma/prisma.service';

@Global()
@Module({
  providers: [Utils, PrismaService],
  exports: [Utils, PrismaService]
})
export class CoreModule {}
