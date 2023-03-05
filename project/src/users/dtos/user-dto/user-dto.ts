import { IsString } from "class-validator";

export class UserDto {
    id: string;
    @IsString()
    username: string;
    @IsString()
    firstName: string;
    @IsString()
    lastName: string;

    constructor(id: string, username: string, 
                firstName: string, lastName: string) {
        this.id = id;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
