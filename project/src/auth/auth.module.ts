import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    imports: [
        PassportModule.register({
            defaultStrategy: 'jwt',
            property: 'user',
            session: false,
        }),
        JwtModule.register({
            secret: process.env.SECRET,
            signOptions: {
                expiresIn: process.env.EXPIRESIN,
            },
        }),
        UsersModule
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, PassportModule]
})
export class AuthModule {}
