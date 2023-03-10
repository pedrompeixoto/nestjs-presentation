import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query, UseInterceptors, } from '@nestjs/common';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import { UserDto } from 'src/users/dtos/user-dto/user-dto';
import { UserService } from 'src/users/services/user-service/user.service';
import { LoggingInterceptor } from 'src/common/interceptors/logging/logging.interceptor';
import { MessageDTO } from 'src/messages/dtos/message-dto';
import { CreateUserDto } from 'src/users/dtos/create-user-dto';

@Controller('users')
@UseInterceptors(LoggingInterceptor)
export class UsersController {

    constructor(private userService: UserService) { }

    @Get()
    async getUsers(@Query("name") name?: string) {
        const users = await this.userService.getAll(name);
        return { success: true, users: UserDto.fromEntityArray(users) };
    }

    @Get(":id")
    async getUserById(
        @Param("id", new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: string
    ) {
        const user = await this.userService.getById(id);
        return { success: true, user: new UserDto(user.id, user.username, user.lastName, user.firstName) };
    }

    @Get(":id/messages")
    async getUserMessages(
        @Param("id", new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id:string
    ) {
        const user = await this.userService.getUnique({
            where: { id },
            include: { messages: true }
        });

        return { 
            success: true, 
            user: new UserDto(user.id, user.username, user.lastName, user.firstName),
            messages: MessageDTO.fromEntityArray(user.messages)
        };
    }

    @Post()
    async create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
        const user = await this.userService.create(createUserDto);
        return { success: true, user: UserDto.fromEntity(user) };
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
                user: UserDto.fromEntity(updatedUser)
            }
        } catch(e: any) {
            throw new HttpException({ message: "User not found" }, HttpStatus.NOT_FOUND);
        }

    }

    @Delete(":id")
    async delete(
        @Param("id", new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: string
    ) {
        const deletedUser = await this.userService.delete(id);
        return {
            success: true,
            user: UserDto.fromEntity(deletedUser)
        };
    }
}
