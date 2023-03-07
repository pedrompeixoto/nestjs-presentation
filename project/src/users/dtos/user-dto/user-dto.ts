import { User } from "@prisma/client";
import { IsNotEmpty, IsString, IsUUID, MaxLength, MinLength, IsOptional } from "class-validator";

export class UserDto {
    @IsUUID()
    @IsOptional()
    id: string;

    @IsString()
    @MinLength(3)
    @MaxLength(20)
    @IsNotEmpty()
    username: string;

    @IsString()
    @MinLength(3)
    @MaxLength(255)
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @MinLength(3)
    @MaxLength(255)
    @IsNotEmpty()
    lastName: string;

    constructor(id: string, username: string, 
                firstName: string, lastName: string) {
        this.id = id;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    static fromEntity(entity: User) {
        return new UserDto(entity.id, entity.username, entity.firstName, entity.lastName);
    }

    static fromEntityArray(messageEntities: User[]): UserDto[] {
        const userDtos = [];

        for (const entity of messageEntities) {
            userDtos.push(this.fromEntity(entity));
        }

        return userDtos;
    }
}
