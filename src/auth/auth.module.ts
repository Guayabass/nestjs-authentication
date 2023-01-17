import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { UsersAuthService } from 'src/users-auth/services/users-auth/users-auth.service';
import { AuthController } from './controller/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { LocalStrategy } from './utils/LocalStrategy';
import { SessionSerializer } from './utils/SessionSerializer';

@Module({
  imports: [TypeOrmModule.forFeature([User])],//ya que estamos metiendo el servicio de User_Service ocupamos meter el repository
  controllers: [AuthController],
  providers: [
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
    {
      provide: 'USER_SERVICE',
      useClass: UsersAuthService,
    },
    LocalStrategy,
    SessionSerializer,
  ],
})
export class AuthModule {}
