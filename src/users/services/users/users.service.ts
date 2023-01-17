import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { User } from 'src/users/types/User';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      email: 'alejandromurillogutierrez@gmail.com',
      name: 'Alejandro',
    },
    {
      id: 2,
      email: 'roberto@gmail.com',
      name: 'Roberto',
    },
    {
      id: 3,
      email: 'raul@gmail.com',
      name: 'Raul',
    },
  ];


  findUserById(id: number) {
    return this.users.find((user) => user.id === id);
  }

  createUser(userDto: CreateUserDto){
    this.users.push(userDto);
  }

  getUsers(){
    return this.users;
  }

}
