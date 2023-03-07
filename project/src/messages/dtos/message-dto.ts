import { Message, User } from "@prisma/client";
import { IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";

export class MessageDTO {
    @IsUUID()
    @IsOptional()
    id: string;

    @IsUUID()
    senderId: string;

    @IsString()
    @MinLength(3)
    @MaxLength(255)
    @IsNotEmpty()
    msg: string;

    constructor(id: string, senderId: string, msg: string) {
        this.id = id;
        this.senderId = senderId;
        this.msg = msg;
    }

    static fromEntity(entity: Message) {
        return new MessageDTO(entity.id, entity.senderId, entity.msg);
    }

    static fromEntityArray(messageEntities: Message[]): MessageDTO[] {
        const messageDtos = [];

        for (const entity of messageEntities) {
            messageDtos.push(this.fromEntity(entity));
        }

        return messageDtos;
    }
}
