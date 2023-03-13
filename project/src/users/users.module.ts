import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UsersController } from './controllers/users/users.controller';
import { UserService } from './services/user-service/user.service';

@Module({
    imports: [AuthModule],
    controllers: [UsersController],
    providers: [UserService],
    exports: [UserService]
})
export class UsersModule {}
