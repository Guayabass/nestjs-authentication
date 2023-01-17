import { Module } from '@nestjs/common';
import { UsersAuthService } from './services/users-auth/users-auth.service';
import { UsersAuthController } from './controllers/users-auth/users-auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersAuthController],
  providers: [{
    provide: 'USER_AUTH_SERVICE',
    useClass: UsersAuthService
  }]
})
export class UsersAuthModule {}
