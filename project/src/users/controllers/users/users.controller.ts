import { BadRequestException, Body, Controller, Delete, ForbiddenException, Get, HttpException, HttpStatus, Inject, Ip, Param, ParseUUIDPipe, Post, Put, Query, UseFilters, UseInterceptors, UsePipes } from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as Joi from 'joi';
import { User } from 'src/common/decorators/user.decorator';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { JoiValidationPipe } from 'src/common/pipes/joi-validation.pipe';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import { Utils } from 'src/core/utils/utils';
import { UserDto } from 'src/users/dtos/user-dto/user-dto';
import { UserService } from 'src/users/services/user-service/user.service';
import { UserEntity } from 'src/users/entity/user/user.entity';
import { LoggingInterceptor } from 'src/common/interceptors/logging/logging.interceptor';

const createUserSchema = Joi.object({
    name: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
})
  
@Controller('users')
@UseInterceptors(LoggingInterceptor)
// @UseFilters(HttpExceptionFilter)
export class UsersController {

    @Inject()
    private userServiceProp: UserService;
    constructor(private utils: Utils, private userService: UserService) {
        this.utils.log("This is a log from a provider in the core module");
    }

    @Get()
    // @UseFilters(new HttpExceptionFilter())
    getUsers(@Query("name") name?: string) {
        return { success: true, users: this.userService.getAll(name) };
    }

    @Get('find')
    async findOne(@User() user: UserEntity) {
        console.log(user);
    }


    // @Get(":id")
    // getUserById(@Param("id", ParseUUIDPipe) id: string) {
    //     return { success: true, user: this.userService.getById(id) };
    // }

    @Get(":id")
    getUserById(@Param("id", new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: string) {
        return { success: true, user: this.userService.getById(id) };
    }

    /* @Get('')
    getUsersAllQueryParams(@Query() query: { [key: string]: string }) {
        if (query.name) {
            return this.userService.findByName(query.name);
        } else {
            return this.userService.getAll();
        }
    } */

    
    @Post()
    create(@Body(new ValidationPipe()) userDto: UserDto) {
        this.userServiceProp;

        return {
            success: true,
            user: this.userService.create(new UserEntity(
                randomUUID(), userDto.username, userDto.firstName, userDto.lastName
            ))
        }  
    }

    @Put(":id")
    // @UseFilters(new HttpExceptionFilter())
    update(@Param("id") userId: string, @Body() userDto: UserDto) {
        // throw new BadRequestException('Something bad happened', { cause: new Error(), description: 'Some error description' });
        const updatedUser = this.userService.update(new UserEntity(
           userId, userDto.username, userDto.firstName, userDto.lastName
       ));

       if (updatedUser) {
           return {
               success: true,
               user: new UserDto(
                   updatedUser.id, updatedUser.username,
                   updatedUser.firstName, updatedUser.lastName
               )
           }
       } else {
           throw new HttpException({ success: false, message: 'User Not Found' }, HttpStatus.NOT_FOUND);
       }
    }

    @Delete(":id")
    delete(@Param("id") userId: string) {
        const deletedUserId = this.userService.delete(userId);
        if (deletedUserId) {
            return deletedUserId;
        } else {
            throw new HttpException({ success: false, message: 'User Not Found' }, HttpStatus.NOT_FOUND);
        }
    }
}
