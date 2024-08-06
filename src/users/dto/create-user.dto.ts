import { Role } from "src/auth/roles.enum";

export class CreateUserDto {

     id:number;
    username:string;
    password:string;
    role:Role;
}
