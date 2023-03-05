import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query, UseInterceptors, } from '@nestjs/common';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import { UserDto } from 'src/users/dtos/user-dto/user-dto';
import { UserService } from 'src/users/services/user-service/user.service';
import { LoggingInterceptor } from 'src/common/interceptors/logging/logging.interceptor';

@Controller('users')
@UseInterceptors(LoggingInterceptor)
export class UsersController {

    constructor(private userService: UserService) { }

    @Get()
    async getUsers(@Query("name") name?: string) {
        const users = await this.userService.getAll(name);
        return { success: true, users };
    }


    @Get(":id")
    async getUserById(
        @Param("id", new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) 
        id: string
    ) {
        const user = await this.userService.getById(id);
        return { success: true, user };
    }

    @Post()
    async create(@Body(new ValidationPipe()) userDto: UserDto) {
        const user = await this.userService.create({
            username: userDto.username,
            firstName: userDto.firstName,
            lastName: userDto.lastName
        });

        return { success: true, user };
    }

    @Put(":id")
    async update(@Param("id") userId: string, @Body(new ValidationPipe()) userDto: UserDto) {

        try {
            const updatedUser = await this.userService.update({
                username: userDto.username,
                firstName: userDto.firstName,
                lastName: userDto.lastName
            }, { id: userId });

            return {
                success: true,
                user: updatedUser
            }
        } catch(e: any) {
            console.log(e)
            return new HttpException({}, HttpStatus.NOT_FOUND);
        }

    }

    @Delete(":id")
    async delete(
        @Param("id", new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: string
    ) {
        const deletedUser = await this.userService.delete(id);
        return {
            success: true,
            user: deletedUser
        };
    }
}
