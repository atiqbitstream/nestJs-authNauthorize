import { IsString, IsNotEmpty, isString } from 'class-validator';

export class signInDTO{

    @IsString()
    @IsNotEmpty()
    username:string;

    @IsString()
    @IsNotEmpty()
    password:string;
}