import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { UsersAuthModule } from './users-auth/users-auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import entities from './typeorm';
import { PassportModule } from '@nestjs/passport';


@Module({
  imports: [UsersModule, UsersAuthModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'na02-db.cus.mc-panel.net',
    port: 3306,
    username: 'db_327362',
    password: 'ce0a4e1f47',
    database: 'db_327362',
    entities,
    synchronize: true
  }), AuthModule, PassportModule.register({session: true})],
  controllers: [],
  providers: [],
})
export class AppModule {}
