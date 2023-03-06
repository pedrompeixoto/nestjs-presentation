import { IsNotEmpty, IsString, IsUUID, MaxLength, MinLength } from "class-validator";

export class UserDto {
    @IsUUID()
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
}
