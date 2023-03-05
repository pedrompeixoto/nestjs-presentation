import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { UserEntity } from 'src/users/entity/user/user.entity';

@Injectable()
export class UserService {
    usersMock: Array<UserEntity> = [
        {
            id: randomUUID(),
            username: "pmpp",
            firstName: "Pedro",
            lastName: "Peixoto"
        }
    ]

    // onModuleInit() { console.log("on module init") }
    // onApplicationBootstrap() { console.log("on application bootstrap") }
    // onModuleDestroy(){ console.log("on module destroy") }
    // beforeApplicationShutdown() { console.log("before application shutdown") }
    // onApplicationShutdown() { console.log("on application shutdown") }

    getAll(name?: string) {
        if (name) {
            return this.usersMock.filter(u => (u.firstName + u.lastName).includes(name));
        } else {
            return this.usersMock;
        }
    }

    getById(id: string) {
        return this.usersMock.find(u => u.id === id);
    }

    update(user: UserEntity) {
        const userIndex = this.usersMock.findIndex(user => user.id === user.id)
        if (userIndex > -1) {
            this.usersMock[userIndex] = user;
            return this.usersMock[userIndex];
        } else {
            return undefined;
        }
    }

    create(user: UserEntity) {
        this.usersMock.push(user);
        return user;
    }

    delete(userId: string) {
        const userIndex = this.usersMock.findIndex(u => u.id === userId)
        if (userIndex > -1) {
            this.usersMock.splice(userIndex, 1);
        } else {
            return undefined;
        }
        return userId;
    }

    findByName(name: string) {

    }
}
