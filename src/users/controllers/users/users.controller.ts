import { Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Req, Res, Body, UsePipes } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common/pipes';
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService){}
    // @Get(':id')
    // getUser(@Param('id', ParseIntPipe) id: number, @Req() req: Request, @Res() res: Response){ EXPRESS WAY

    //     const user = this.userService.findUserById(id);

    //     if (user) {
    //         res.send(user)
    //     } else {
    //         res.status(400).send({msg: 'User not found'})
    //     }
    // }

    @Get(':id')
    getUser(@Param('id', ParseIntPipe) id: number){

        const user = this.userService.findUserById(id);

        if (user) {
            return user;
        } else {
            throw new HttpException('Customer Not Found', HttpStatus.BAD_REQUEST)
        }
    }

    @Get('')
    GetAllUsers(){
        return this.userService.getUsers();
    }


    @Post('create')
    @UsePipes(ValidationPipe)//para que el class validator funcione
    createUser(@Body() createUserDto: CreateUserDto){
        console.log(createUserDto);
        this.userService.createUser(createUserDto);
    }

}
