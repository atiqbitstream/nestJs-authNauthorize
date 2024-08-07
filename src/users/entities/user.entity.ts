import { Role } from "src/auth/roles.enum"
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    username:string

    @Column()
    password:string

    @Column({ type: 'enum', enum: Role, default: Role.USER }) 
    role:Role;
    
}
