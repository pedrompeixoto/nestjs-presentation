import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LoginDto } from 'src/auth/dtos/login-dto';
import { AuthService } from 'src/auth/services/auth/auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post("login")
    async login(@Body() loginDto: LoginDto) {
        return await this.authService.login(loginDto)
    }
}
