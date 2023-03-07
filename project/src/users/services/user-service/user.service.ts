import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class UserService {

    constructor(private prismaService: PrismaService) {}

    // onModuleInit() { console.log("on module init") }
    // onApplicationBootstrap() { console.log("on application bootstrap") }
    // onModuleDestroy(){ console.log("on module destroy") }
    // beforeApplicationShutdown() { console.log("before application shutdown") }
    // onApplicationShutdown() { console.log("on application shutdown") }

    getAll(name?: string): Promise<User[]> {
        if (name) {
            return this.prismaService.user.findMany({
                where: { username: name }
            });
        } else {
            return this.prismaService.user.findMany();
        }
    }

    get(options: { 
        where?: Prisma.UserWhereInput, 
        orderBy?: Prisma.UserOrderByWithRelationInput,
        cursor?: Prisma.UserWhereUniqueInput,
        include?: Prisma.UserInclude,
        skip?: number,
        take?: number,
    }): Promise<User[]> {
        const { where, orderBy, skip, take, cursor, include } = options;

        return this.prismaService.user.findMany({
            where,
            orderBy,
            skip,
            take,
            cursor,
            include
        });
    }

    getUnique(options: { 
        where?: Prisma.UserWhereUniqueInput, 
        include?: Prisma.UserInclude,
    }) {
        return this.prismaService.user.findUniqueOrThrow({ where: options.where, include: options.include });
    }

    getById(id: string): Promise<User> {
        return this.prismaService.user.findUniqueOrThrow({ where: { id } });
    }

    update(user: Prisma.UserUpdateInput, where: Prisma.UserWhereUniqueInput): Promise<User> {
        return this.prismaService.user.update({
            data: user,
            where 
        });
    }

    create(user: Prisma.UserCreateInput): Promise<User> {
        return this.prismaService.user.create({
            data: user
        });
    }

    delete(id: string): Promise<User> {
        return this.prismaService.user.delete({
            where: { id }
        });
    }
}
