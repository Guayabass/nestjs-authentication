import { IsEmail, isNotEmpty, IsNotEmpty, IsNumberString  } from "class-validator";


export class CreateUserDto{
    @IsEmail()
    email: string;

    @IsNumberString()
    @IsNotEmpty()//ocupa ser string osea con "" en el postman o el call
    id: number;

    @IsNotEmpty()
    name: string;
}