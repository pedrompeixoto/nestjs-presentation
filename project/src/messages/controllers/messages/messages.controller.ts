import { Body, Controller, Get, HttpStatus, Param, ParseUUIDPipe, Post, ValidationPipe } from '@nestjs/common';
import { MessageDTO } from 'src/messages/dtos/message-dto';
import { MessagesService } from 'src/messages/services/messages/messages.service';
import { UserService } from 'src/users/services/user-service/user.service';

@Controller('messages')
export class MessagesController {

    constructor(private messageService: MessagesService, private userService: UserService) {}

    @Get()
    async get() {
        const messages = await this.messageService.get();
        return { success: true, message: MessageDTO.fromEntityArray(messages) };
    }

    @Get(":id")
    async getUserById(
        @Param("id", new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) 
        id: string
    ) {

        const message = await this.messageService.getById(id);

        return { success: true, message: MessageDTO.fromEntity(message) };
    }

    @Post()
    async create(@Body(new ValidationPipe()) messageDTO: MessageDTO) {

        const sender = await this.userService.getById(messageDTO.senderId);

        const message = await this.messageService.create({
            msg: messageDTO.msg,
            sender: {
                connect: {
                    id: sender.id
                }
            }
        });

        return { success: true, message: MessageDTO.fromEntity(message) }
    }
}
