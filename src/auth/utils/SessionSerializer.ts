import { Inject } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { User } from "src/typeorm";
import { UsersAuthService } from "src/users-auth/services/users-auth/users-auth.service";

export class SessionSerializer extends PassportSerializer{

    constructor(@Inject('USER_SERVICE') private readonly usersService: UsersAuthService){
        super();
    }

    serializeUser(user: User, done: (err, user: User) => void) {
        console.log('Serializing user')
        done(null, user)
    }
    async deserializeUser(user: User, done: (err, user: User) => void) {
        console.log('Deserializing user')
        const userDB = await this.usersService.findUserById(user.id);
        return userDB ? done(null, user) : done(null,null);
    }
}
