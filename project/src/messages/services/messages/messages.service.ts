import { Injectable } from '@nestjs/common';
import { Message, Prisma } from '@prisma/client';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class MessagesService {
    
    constructor(private prismaService: PrismaService) {}

    get(): Promise<Message[]> {
        return this.prismaService.message.findMany();
    }


    getById(id: string): Promise<Message> {
        return this.prismaService.message.findFirstOrThrow({
            where: { id }
        });
    }

    create(data: Prisma.MessageCreateInput): Promise<Message> {
        return this.prismaService.message.create({
            data
        });
    }
}
