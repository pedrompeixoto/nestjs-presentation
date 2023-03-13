import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { User } from '@prisma/client';
import { LoginDto } from 'src/auth/dtos/login-dto';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { Utils } from 'src/core/utils/utils';

@Injectable()
export class AuthService {

    constructor(private prisma: PrismaService, private utils: Utils, private jwtService: JwtService) {}
    
    public async validate(username: string, password: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: { username }
        })

        if (!user) {
            return null;
        }

        const valid = await this.utils.validateHash(password, user.password);

        if (valid) {
            return user;
        } else {
            return null;
        }
    }

    public async login(loginDto: LoginDto) {
        const user = await this.validate(loginDto.username, loginDto.password);
        if (user) {
            return this.createToken(user);
        } else {
            return null;
        }
    }

    private createToken(user: User): any {
        const payload: JwtPayload = { userId: user.id, firstName: user.firstName, lastName: user.lastName, username: user.username };    
        const accessToken = this.jwtService.sign(payload);
        return {
            expiresIn: process.env.EXPIRESIN,
            accessToken,
        };  
    }
}
