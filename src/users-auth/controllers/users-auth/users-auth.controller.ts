import { Body, ClassSerializerInterceptor, Controller, Get, HttpException, HttpStatus, Inject, Param, ParseIntPipe, Post, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from 'src/users-auth/dto/CreateUser.dto';
import { UserNotFoundException } from 'src/users-auth/exceptions/UserNotFound.exception';
import { UsersAuthService } from 'src/users-auth/services/users-auth/users-auth.service';
import { SerializedUser } from 'src/users-auth/types';

@Controller('authuser')
export class UsersAuthController {

    constructor(@Inject('USER_AUTH_SERVICE') private readonly userService: UsersAuthService){

    }

    @UseInterceptors(ClassSerializerInterceptor)//para poder serializar bien
    @Get('')
    getUsers(){
        return this.userService.getUsersAuth();
    }

    @UseInterceptors(ClassSerializerInterceptor)//para poder serializar bien
    @Get('/username/:username')
    getUsersByUsername(@Param('username') username: string){
        const user = this.userService.getUserByUsername(username);

        if (user) return new SerializedUser(user);
        else throw new HttpException('User Not Found', HttpStatus.BAD_REQUEST);
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/id/:id')
    getUsersById(@Param('id', ParseIntPipe) id: number){
        const user = this.userService.getUserById(id);

        if (user) return new SerializedUser(user);
        else throw new UserNotFoundException(); // or use NotFoundException();
        //else throw new HttpException('User Not Found', HttpStatus.BAD_REQUEST);
    }

    @Post('create')
    @UsePipes(ValidationPipe)
    createUser(@Body() createUserDto : CreateUserDto){
        return this.userService.createUser(createUserDto);
    }
}
