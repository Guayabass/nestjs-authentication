import { Inject, Injectable } from '@nestjs/common';
import { match } from 'assert';
import { UsersAuthService } from 'src/users-auth/services/users-auth/users-auth.service';
import { comparePasswords } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
    constructor(@Inject('USER_SERVICE') private readonly userService: UsersAuthService){

    }
    async validateUser(username: string, password: string){
        const userDB = await this.userService.findUserByUsername(username)

        if (userDB){
            const matched = comparePasswords(password, userDB.password);
            if (matched){
                console.log('Validation Succesful')
                return userDB;
            } else {
                console.log('Wrong Password');
                return null;
            }

        }
        console.log('Validation failed')
        return null;
    }
}
