import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class LoginDto {

    @IsString()
    @MinLength(3)
    @MaxLength(20)
    @IsNotEmpty()
    username: string;

    @IsString()
    @MinLength(3)
    @MaxLength(255)
    @IsNotEmpty()
    password: string;
}
