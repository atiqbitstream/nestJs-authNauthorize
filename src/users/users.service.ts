import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private readonly userRepository:Repository<User>){}

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where:{username}})
  
  }

  async createUser(user:User):Promise<User> {
    return this.userRepository.save(user);
  }

  findAll() {
    return `This action returns all users`;
  }

 

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
