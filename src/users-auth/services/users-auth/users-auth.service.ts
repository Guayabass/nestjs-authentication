import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  plainToInstance } from 'class-transformer';
import { User } from 'src/typeorm';
import { CreateUserDto } from 'src/users-auth/dto/CreateUser.dto';
import { SerializedUser, UserAuth } from 'src/users-auth/types/index';
import { encodePassword } from 'src/utils/bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class UsersAuthService {

    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>){

    }

    private usersAuth: UserAuth[] = []

getUsersAuth(){
    return this.usersAuth.map((user) => new SerializedUser(user)); //for it to call the class that is serialized instead of the interface (plainToInstance method)
} 

getUserByUsername(username: string){
    return this.usersAuth.find((user) => user.username === username);
}

getUserById(id: number){
     return this.usersAuth.find((user) => user.id === id)
}

createUser(createUserDto: CreateUserDto){
    const password = encodePassword(createUserDto.password);
    console.log(password);
    const newUser = this.userRepository.create({...createUserDto, password});
    return this.userRepository.save(newUser)
}

findUserByUsername(username: string){
    return this.userRepository.findOne({where: {username}})
}

findUserById(id: number){
    return this.userRepository.findOne({where: {id}});
}

}
