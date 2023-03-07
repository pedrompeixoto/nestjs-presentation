import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { MessagesController } from './controllers/messages/messages.controller';
import { MessagesService } from './services/messages/messages.service';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService],
  imports: [UsersModule],
})
export class MessagesModule {}
